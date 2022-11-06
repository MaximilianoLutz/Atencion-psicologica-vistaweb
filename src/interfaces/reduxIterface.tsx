
export interface reducersTypes {
    authReducer: {}
}

type authDatos = {
    type: string;
    payload: {
        uidAuth: string,
        displayName: string,
        checking: boolean
    }
}

type authPayload = {
    uidAuth?: string;
    displayName?: string;
    profesionalesUseruidAuth?: [];
    checking?: boolean;
}
export interface actionAuth {
    type: string;
    payload: authPayload;
}


export interface authState {
    readonly checking?: boolean;
    readonly profesionalesUser?: [];
    readonly uidAuth?: string;
    readonly name?: string;
}