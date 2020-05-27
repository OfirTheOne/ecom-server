export class BaseHandler {

    protected _isAdmin: boolean;
    public set isAdmin(isAdmin: boolean) {
        this._isAdmin = isAdmin
    }

    public get isAdmin() {
        return this._isAdmin;
    }
}