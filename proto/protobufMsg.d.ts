import * as $protobuf from "protobufjs";

/** Namespace AuthProto. */
export namespace AuthProto {

    /** Cmd enum. */
    enum Cmd {
        INVALED = 0,
        eLoginReq = 1,
        eLoginRes = 2
    }

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq name */
        name?: (string|null);

        /** LoginReq age */
        age?: (number|null);

        /** LoginReq email */
        email?: (string|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.ILoginReq);

        /** LoginReq name. */
        public name: string;

        /** LoginReq age. */
        public age: number;

        /** LoginReq email. */
        public email: string;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: AuthProto.ILoginReq): AuthProto.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link AuthProto.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link AuthProto.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: { [k: string]: any }): AuthProto.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRes. */
    interface ILoginRes {

        /** LoginRes status */
        status?: (number|null);
    }

    /** Represents a LoginRes. */
    class LoginRes implements ILoginRes {

        /**
         * Constructs a new LoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.ILoginRes);

        /** LoginRes status. */
        public status: number;

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRes instance
         */
        public static create(properties?: AuthProto.ILoginRes): AuthProto.LoginRes;

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link AuthProto.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link AuthProto.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.LoginRes;

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.LoginRes;

        /**
         * Verifies a LoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRes
         */
        public static fromObject(object: { [k: string]: any }): AuthProto.LoginRes;

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @param message LoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.LoginRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace TalkProto. */
export namespace TalkProto {

    /** Cmd enum. */
    enum Cmd {
        INVALID_CMD = 0,
        eLoginReq = 1,
        eLoginRes = 2,
        eExitReq = 3,
        eExitRes = 4,
        eSendMsgReq = 5,
        eSendMsgRes = 6,
        eOnUserLogin = 7,
        eOnUserExit = 8,
        eOnSendMsg = 9
    }

    /** Properties of a LoginReq. */
    interface ILoginReq {
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.ILoginReq);

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: TalkProto.ILoginReq): TalkProto.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link TalkProto.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link TalkProto.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRes. */
    interface ILoginRes {

        /** LoginRes status */
        status: number;
    }

    /** Represents a LoginRes. */
    class LoginRes implements ILoginRes {

        /**
         * Constructs a new LoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.ILoginRes);

        /** LoginRes status. */
        public status: number;

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRes instance
         */
        public static create(properties?: TalkProto.ILoginRes): TalkProto.LoginRes;

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link TalkProto.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link TalkProto.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.LoginRes;

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.LoginRes;

        /**
         * Verifies a LoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRes
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.LoginRes;

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @param message LoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.LoginRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitReq. */
    interface IExitReq {
    }

    /** Represents an ExitReq. */
    class ExitReq implements IExitReq {

        /**
         * Constructs a new ExitReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.IExitReq);

        /**
         * Creates a new ExitReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitReq instance
         */
        public static create(properties?: TalkProto.IExitReq): TalkProto.ExitReq;

        /**
         * Encodes the specified ExitReq message. Does not implicitly {@link TalkProto.ExitReq.verify|verify} messages.
         * @param message ExitReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.IExitReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitReq message, length delimited. Does not implicitly {@link TalkProto.ExitReq.verify|verify} messages.
         * @param message ExitReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.IExitReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.ExitReq;

        /**
         * Decodes an ExitReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.ExitReq;

        /**
         * Verifies an ExitReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitReq
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.ExitReq;

        /**
         * Creates a plain object from an ExitReq message. Also converts values to other types if specified.
         * @param message ExitReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.ExitReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExitRes. */
    interface IExitRes {

        /** ExitRes status */
        status: number;
    }

    /** Represents an ExitRes. */
    class ExitRes implements IExitRes {

        /**
         * Constructs a new ExitRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.IExitRes);

        /** ExitRes status. */
        public status: number;

        /**
         * Creates a new ExitRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExitRes instance
         */
        public static create(properties?: TalkProto.IExitRes): TalkProto.ExitRes;

        /**
         * Encodes the specified ExitRes message. Does not implicitly {@link TalkProto.ExitRes.verify|verify} messages.
         * @param message ExitRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.IExitRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExitRes message, length delimited. Does not implicitly {@link TalkProto.ExitRes.verify|verify} messages.
         * @param message ExitRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.IExitRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExitRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExitRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.ExitRes;

        /**
         * Decodes an ExitRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExitRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.ExitRes;

        /**
         * Verifies an ExitRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExitRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRes
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.ExitRes;

        /**
         * Creates a plain object from an ExitRes message. Also converts values to other types if specified.
         * @param message ExitRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.ExitRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExitRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendMsgReq. */
    interface ISendMsgReq {

        /** SendMsgReq content */
        content: string;
    }

    /** Represents a SendMsgReq. */
    class SendMsgReq implements ISendMsgReq {

        /**
         * Constructs a new SendMsgReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.ISendMsgReq);

        /** SendMsgReq content. */
        public content: string;

        /**
         * Creates a new SendMsgReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendMsgReq instance
         */
        public static create(properties?: TalkProto.ISendMsgReq): TalkProto.SendMsgReq;

        /**
         * Encodes the specified SendMsgReq message. Does not implicitly {@link TalkProto.SendMsgReq.verify|verify} messages.
         * @param message SendMsgReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.ISendMsgReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendMsgReq message, length delimited. Does not implicitly {@link TalkProto.SendMsgReq.verify|verify} messages.
         * @param message SendMsgReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.ISendMsgReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendMsgReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendMsgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.SendMsgReq;

        /**
         * Decodes a SendMsgReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendMsgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.SendMsgReq;

        /**
         * Verifies a SendMsgReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendMsgReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgReq
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.SendMsgReq;

        /**
         * Creates a plain object from a SendMsgReq message. Also converts values to other types if specified.
         * @param message SendMsgReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.SendMsgReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendMsgReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendMsgRes. */
    interface ISendMsgRes {

        /** SendMsgRes status */
        status: number;
    }

    /** Represents a SendMsgRes. */
    class SendMsgRes implements ISendMsgRes {

        /**
         * Constructs a new SendMsgRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.ISendMsgRes);

        /** SendMsgRes status. */
        public status: number;

        /**
         * Creates a new SendMsgRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendMsgRes instance
         */
        public static create(properties?: TalkProto.ISendMsgRes): TalkProto.SendMsgRes;

        /**
         * Encodes the specified SendMsgRes message. Does not implicitly {@link TalkProto.SendMsgRes.verify|verify} messages.
         * @param message SendMsgRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.ISendMsgRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendMsgRes message, length delimited. Does not implicitly {@link TalkProto.SendMsgRes.verify|verify} messages.
         * @param message SendMsgRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.ISendMsgRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendMsgRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendMsgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.SendMsgRes;

        /**
         * Decodes a SendMsgRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendMsgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.SendMsgRes;

        /**
         * Verifies a SendMsgRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendMsgRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgRes
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.SendMsgRes;

        /**
         * Creates a plain object from a SendMsgRes message. Also converts values to other types if specified.
         * @param message SendMsgRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.SendMsgRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendMsgRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OnUserLogin. */
    interface IOnUserLogin {

        /** OnUserLogin ip */
        ip: string;

        /** OnUserLogin port */
        port: number;
    }

    /** Represents an OnUserLogin. */
    class OnUserLogin implements IOnUserLogin {

        /**
         * Constructs a new OnUserLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.IOnUserLogin);

        /** OnUserLogin ip. */
        public ip: string;

        /** OnUserLogin port. */
        public port: number;

        /**
         * Creates a new OnUserLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OnUserLogin instance
         */
        public static create(properties?: TalkProto.IOnUserLogin): TalkProto.OnUserLogin;

        /**
         * Encodes the specified OnUserLogin message. Does not implicitly {@link TalkProto.OnUserLogin.verify|verify} messages.
         * @param message OnUserLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.IOnUserLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OnUserLogin message, length delimited. Does not implicitly {@link TalkProto.OnUserLogin.verify|verify} messages.
         * @param message OnUserLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.IOnUserLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OnUserLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OnUserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.OnUserLogin;

        /**
         * Decodes an OnUserLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OnUserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.OnUserLogin;

        /**
         * Verifies an OnUserLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OnUserLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnUserLogin
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.OnUserLogin;

        /**
         * Creates a plain object from an OnUserLogin message. Also converts values to other types if specified.
         * @param message OnUserLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnUserLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OnUserLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OnUserExit. */
    interface IOnUserExit {

        /** OnUserExit ip */
        ip: string;

        /** OnUserExit port */
        port: number;
    }

    /** Represents an OnUserExit. */
    class OnUserExit implements IOnUserExit {

        /**
         * Constructs a new OnUserExit.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.IOnUserExit);

        /** OnUserExit ip. */
        public ip: string;

        /** OnUserExit port. */
        public port: number;

        /**
         * Creates a new OnUserExit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OnUserExit instance
         */
        public static create(properties?: TalkProto.IOnUserExit): TalkProto.OnUserExit;

        /**
         * Encodes the specified OnUserExit message. Does not implicitly {@link TalkProto.OnUserExit.verify|verify} messages.
         * @param message OnUserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.IOnUserExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OnUserExit message, length delimited. Does not implicitly {@link TalkProto.OnUserExit.verify|verify} messages.
         * @param message OnUserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.IOnUserExit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OnUserExit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OnUserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.OnUserExit;

        /**
         * Decodes an OnUserExit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OnUserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.OnUserExit;

        /**
         * Verifies an OnUserExit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OnUserExit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnUserExit
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.OnUserExit;

        /**
         * Creates a plain object from an OnUserExit message. Also converts values to other types if specified.
         * @param message OnUserExit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnUserExit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OnUserExit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OnSendMsg. */
    interface IOnSendMsg {

        /** OnSendMsg ip */
        ip: string;

        /** OnSendMsg port */
        port: number;

        /** OnSendMsg content */
        content: string;
    }

    /** Represents an OnSendMsg. */
    class OnSendMsg implements IOnSendMsg {

        /**
         * Constructs a new OnSendMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: TalkProto.IOnSendMsg);

        /** OnSendMsg ip. */
        public ip: string;

        /** OnSendMsg port. */
        public port: number;

        /** OnSendMsg content. */
        public content: string;

        /**
         * Creates a new OnSendMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OnSendMsg instance
         */
        public static create(properties?: TalkProto.IOnSendMsg): TalkProto.OnSendMsg;

        /**
         * Encodes the specified OnSendMsg message. Does not implicitly {@link TalkProto.OnSendMsg.verify|verify} messages.
         * @param message OnSendMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: TalkProto.IOnSendMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OnSendMsg message, length delimited. Does not implicitly {@link TalkProto.OnSendMsg.verify|verify} messages.
         * @param message OnSendMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: TalkProto.IOnSendMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OnSendMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OnSendMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TalkProto.OnSendMsg;

        /**
         * Decodes an OnSendMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OnSendMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TalkProto.OnSendMsg;

        /**
         * Verifies an OnSendMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OnSendMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnSendMsg
         */
        public static fromObject(object: { [k: string]: any }): TalkProto.OnSendMsg;

        /**
         * Creates a plain object from an OnSendMsg message. Also converts values to other types if specified.
         * @param message OnSendMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnSendMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OnSendMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
