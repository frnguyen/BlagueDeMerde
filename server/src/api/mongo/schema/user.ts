import {Document, Schema, Model, model} from 'mongoose';
import {IUser} from './interface/iUser';
import {Team} from './team';
import {Console} from 'tsunamy/core';

export interface IUserModel extends IUser, Document {
    hello(): string;
    userExist(user: IUser): Promise<boolean>;
}

export const UserSchema: Schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    lastConnection: { type: Date, default: null },
    name: String,
    firstName: String,
    password: String,
    email: String,
    pseudo: String,
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

UserSchema.methods.hello = function(): string {
    return (this.firstName.trim() + ' ' + this.name.trim());
};

UserSchema.methods.userExist = async function(user: IUser): Promise<boolean> {
    const userFind = await User.findOne().or([{pseudo: user.pseudo}, {email: user.email}])
        .then((resp: IUserModel | null) => resp)
        .catch((err: any) => Console.Err(err));

    return new Promise<boolean>(resolve => resolve(!!userFind));
};

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
