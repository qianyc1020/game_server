import * as $protobuf from "protobufjs";

/** Namespace AuthProto. */
export namespace AuthProto {

    /** Cmd enum. */
    enum Cmd {
        INVALED = 0,
        eUnameLoginReq = 1,
        eUnameLoginRes = 2,
        eGuestLoginReq = 3,
        eGuestLoginRes = 4,
        eUnameRegistReq = 5,
        eUnameRegistRes = 6,
        ePhoneRegistReq = 7,
        ePhoneRegistRes = 8,
        eGetPhoneRegVerNumReq = 9,
        eGetPhoneRegVerNumRes = 10,
        eBindPhoneNumberReq = 11,
        eBindPhoneNumberRes = 12,
        eResetUserPwdReq = 13,
        eResetUserPwdRes = 14,
        eLoginOutReq = 15,
        eLoginOutRes = 16,
        eEditProfileReq = 17,
        eEditProfileRes = 18,
        eAccountUpgradeReq = 19,
        eAccountUpgradeRes = 20,
        eGetUserCenterInfoReq = 21,
        eGetUserCenterInfoRes = 22,
        eReloginRes = 23,
        eUserLostConnectRes = 24
    }

    /** Properties of an UnameLoginReq. */
    interface IUnameLoginReq {

        /** UnameLoginReq uname */
        uname: string;

        /** UnameLoginReq upwd */
        upwd: string;
    }

    /** Represents an UnameLoginReq. */
    class UnameLoginReq implements IUnameLoginReq {

        /**
         * Constructs a new UnameLoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IUnameLoginReq);

        /** UnameLoginReq uname. */
        public uname: string;

        /** UnameLoginReq upwd. */
        public upwd: string;

        /**
         * Creates a new UnameLoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnameLoginReq instance
         */
        public static create(properties?: AuthProto.IUnameLoginReq): AuthProto.UnameLoginReq;

        /**
         * Encodes the specified UnameLoginReq message. Does not implicitly {@link AuthProto.UnameLoginReq.verify|verify} messages.
         * @param message UnameLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IUnameLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnameLoginReq message, length delimited. Does not implicitly {@link AuthProto.UnameLoginReq.verify|verify} messages.
         * @param message UnameLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IUnameLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnameLoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.UnameLoginReq;

        /**
         * Decodes an UnameLoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.UnameLoginReq;

        /**
         * Verifies an UnameLoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an UnameLoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnameLoginReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.UnameLoginReq;

        /**
         * Creates a plain object from an UnameLoginReq message. Also converts values to other types if specified.
         * @param message UnameLoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.UnameLoginReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this UnameLoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an UnameLoginRes. */
    interface IUnameLoginRes {

        /** UnameLoginRes status */
        status?: (number|null);
    }

    /** Represents an UnameLoginRes. */
    class UnameLoginRes implements IUnameLoginRes {

        /**
         * Constructs a new UnameLoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IUnameLoginRes);

        /** UnameLoginRes status. */
        public status: number;

        /**
         * Creates a new UnameLoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnameLoginRes instance
         */
        public static create(properties?: AuthProto.IUnameLoginRes): AuthProto.UnameLoginRes;

        /**
         * Encodes the specified UnameLoginRes message. Does not implicitly {@link AuthProto.UnameLoginRes.verify|verify} messages.
         * @param message UnameLoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IUnameLoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnameLoginRes message, length delimited. Does not implicitly {@link AuthProto.UnameLoginRes.verify|verify} messages.
         * @param message UnameLoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IUnameLoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnameLoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnameLoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.UnameLoginRes;

        /**
         * Decodes an UnameLoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnameLoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.UnameLoginRes;

        /**
         * Verifies an UnameLoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an UnameLoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnameLoginRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.UnameLoginRes;

        /**
         * Creates a plain object from an UnameLoginRes message. Also converts values to other types if specified.
         * @param message UnameLoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.UnameLoginRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this UnameLoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GuestLoginReq. */
    interface IGuestLoginReq {

        /** GuestLoginReq guestkey */
        guestkey: string;
    }

    /** Represents a GuestLoginReq. */
    class GuestLoginReq implements IGuestLoginReq {

        /**
         * Constructs a new GuestLoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGuestLoginReq);

        /** GuestLoginReq guestkey. */
        public guestkey: string;

        /**
         * Creates a new GuestLoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GuestLoginReq instance
         */
        public static create(properties?: AuthProto.IGuestLoginReq): AuthProto.GuestLoginReq;

        /**
         * Encodes the specified GuestLoginReq message. Does not implicitly {@link AuthProto.GuestLoginReq.verify|verify} messages.
         * @param message GuestLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGuestLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GuestLoginReq message, length delimited. Does not implicitly {@link AuthProto.GuestLoginReq.verify|verify} messages.
         * @param message GuestLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGuestLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GuestLoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GuestLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GuestLoginReq;

        /**
         * Decodes a GuestLoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GuestLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GuestLoginReq;

        /**
         * Verifies a GuestLoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GuestLoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GuestLoginReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GuestLoginReq;

        /**
         * Creates a plain object from a GuestLoginReq message. Also converts values to other types if specified.
         * @param message GuestLoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GuestLoginReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GuestLoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GuestLoginRes. */
    interface IGuestLoginRes {

        /** GuestLoginRes status */
        status: number;
    }

    /** Represents a GuestLoginRes. */
    class GuestLoginRes implements IGuestLoginRes {

        /**
         * Constructs a new GuestLoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGuestLoginRes);

        /** GuestLoginRes status. */
        public status: number;

        /**
         * Creates a new GuestLoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GuestLoginRes instance
         */
        public static create(properties?: AuthProto.IGuestLoginRes): AuthProto.GuestLoginRes;

        /**
         * Encodes the specified GuestLoginRes message. Does not implicitly {@link AuthProto.GuestLoginRes.verify|verify} messages.
         * @param message GuestLoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGuestLoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GuestLoginRes message, length delimited. Does not implicitly {@link AuthProto.GuestLoginRes.verify|verify} messages.
         * @param message GuestLoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGuestLoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GuestLoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GuestLoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GuestLoginRes;

        /**
         * Decodes a GuestLoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GuestLoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GuestLoginRes;

        /**
         * Verifies a GuestLoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GuestLoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GuestLoginRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GuestLoginRes;

        /**
         * Creates a plain object from a GuestLoginRes message. Also converts values to other types if specified.
         * @param message GuestLoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GuestLoginRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GuestLoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an UnameRegistReq. */
    interface IUnameRegistReq {

        /** UnameRegistReq uname */
        uname: string;

        /** UnameRegistReq upwdmd5 */
        upwdmd5: string;
    }

    /** Represents an UnameRegistReq. */
    class UnameRegistReq implements IUnameRegistReq {

        /**
         * Constructs a new UnameRegistReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IUnameRegistReq);

        /** UnameRegistReq uname. */
        public uname: string;

        /** UnameRegistReq upwdmd5. */
        public upwdmd5: string;

        /**
         * Creates a new UnameRegistReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnameRegistReq instance
         */
        public static create(properties?: AuthProto.IUnameRegistReq): AuthProto.UnameRegistReq;

        /**
         * Encodes the specified UnameRegistReq message. Does not implicitly {@link AuthProto.UnameRegistReq.verify|verify} messages.
         * @param message UnameRegistReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IUnameRegistReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnameRegistReq message, length delimited. Does not implicitly {@link AuthProto.UnameRegistReq.verify|verify} messages.
         * @param message UnameRegistReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IUnameRegistReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnameRegistReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnameRegistReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.UnameRegistReq;

        /**
         * Decodes an UnameRegistReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnameRegistReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.UnameRegistReq;

        /**
         * Verifies an UnameRegistReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an UnameRegistReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnameRegistReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.UnameRegistReq;

        /**
         * Creates a plain object from an UnameRegistReq message. Also converts values to other types if specified.
         * @param message UnameRegistReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.UnameRegistReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this UnameRegistReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an UnameRegistRes. */
    interface IUnameRegistRes {

        /** UnameRegistRes status */
        status: number;
    }

    /** Represents an UnameRegistRes. */
    class UnameRegistRes implements IUnameRegistRes {

        /**
         * Constructs a new UnameRegistRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IUnameRegistRes);

        /** UnameRegistRes status. */
        public status: number;

        /**
         * Creates a new UnameRegistRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnameRegistRes instance
         */
        public static create(properties?: AuthProto.IUnameRegistRes): AuthProto.UnameRegistRes;

        /**
         * Encodes the specified UnameRegistRes message. Does not implicitly {@link AuthProto.UnameRegistRes.verify|verify} messages.
         * @param message UnameRegistRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IUnameRegistRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnameRegistRes message, length delimited. Does not implicitly {@link AuthProto.UnameRegistRes.verify|verify} messages.
         * @param message UnameRegistRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IUnameRegistRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnameRegistRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnameRegistRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.UnameRegistRes;

        /**
         * Decodes an UnameRegistRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnameRegistRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.UnameRegistRes;

        /**
         * Verifies an UnameRegistRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an UnameRegistRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnameRegistRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.UnameRegistRes;

        /**
         * Creates a plain object from an UnameRegistRes message. Also converts values to other types if specified.
         * @param message UnameRegistRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.UnameRegistRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this UnameRegistRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a PhoneRegistReq. */
    interface IPhoneRegistReq {
    }

    /** Represents a PhoneRegistReq. */
    class PhoneRegistReq implements IPhoneRegistReq {

        /**
         * Constructs a new PhoneRegistReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IPhoneRegistReq);

        /**
         * Creates a new PhoneRegistReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PhoneRegistReq instance
         */
        public static create(properties?: AuthProto.IPhoneRegistReq): AuthProto.PhoneRegistReq;

        /**
         * Encodes the specified PhoneRegistReq message. Does not implicitly {@link AuthProto.PhoneRegistReq.verify|verify} messages.
         * @param message PhoneRegistReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IPhoneRegistReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PhoneRegistReq message, length delimited. Does not implicitly {@link AuthProto.PhoneRegistReq.verify|verify} messages.
         * @param message PhoneRegistReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IPhoneRegistReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PhoneRegistReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhoneRegistReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.PhoneRegistReq;

        /**
         * Decodes a PhoneRegistReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhoneRegistReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.PhoneRegistReq;

        /**
         * Verifies a PhoneRegistReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a PhoneRegistReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PhoneRegistReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.PhoneRegistReq;

        /**
         * Creates a plain object from a PhoneRegistReq message. Also converts values to other types if specified.
         * @param message PhoneRegistReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.PhoneRegistReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this PhoneRegistReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a PhoneRegistRes. */
    interface IPhoneRegistRes {
    }

    /** Represents a PhoneRegistRes. */
    class PhoneRegistRes implements IPhoneRegistRes {

        /**
         * Constructs a new PhoneRegistRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IPhoneRegistRes);

        /**
         * Creates a new PhoneRegistRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PhoneRegistRes instance
         */
        public static create(properties?: AuthProto.IPhoneRegistRes): AuthProto.PhoneRegistRes;

        /**
         * Encodes the specified PhoneRegistRes message. Does not implicitly {@link AuthProto.PhoneRegistRes.verify|verify} messages.
         * @param message PhoneRegistRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IPhoneRegistRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PhoneRegistRes message, length delimited. Does not implicitly {@link AuthProto.PhoneRegistRes.verify|verify} messages.
         * @param message PhoneRegistRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IPhoneRegistRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PhoneRegistRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PhoneRegistRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.PhoneRegistRes;

        /**
         * Decodes a PhoneRegistRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PhoneRegistRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.PhoneRegistRes;

        /**
         * Verifies a PhoneRegistRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a PhoneRegistRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PhoneRegistRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.PhoneRegistRes;

        /**
         * Creates a plain object from a PhoneRegistRes message. Also converts values to other types if specified.
         * @param message PhoneRegistRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.PhoneRegistRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this PhoneRegistRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GetPhoneRegVerNumReq. */
    interface IGetPhoneRegVerNumReq {
    }

    /** Represents a GetPhoneRegVerNumReq. */
    class GetPhoneRegVerNumReq implements IGetPhoneRegVerNumReq {

        /**
         * Constructs a new GetPhoneRegVerNumReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGetPhoneRegVerNumReq);

        /**
         * Creates a new GetPhoneRegVerNumReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetPhoneRegVerNumReq instance
         */
        public static create(properties?: AuthProto.IGetPhoneRegVerNumReq): AuthProto.GetPhoneRegVerNumReq;

        /**
         * Encodes the specified GetPhoneRegVerNumReq message. Does not implicitly {@link AuthProto.GetPhoneRegVerNumReq.verify|verify} messages.
         * @param message GetPhoneRegVerNumReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGetPhoneRegVerNumReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetPhoneRegVerNumReq message, length delimited. Does not implicitly {@link AuthProto.GetPhoneRegVerNumReq.verify|verify} messages.
         * @param message GetPhoneRegVerNumReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGetPhoneRegVerNumReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetPhoneRegVerNumReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetPhoneRegVerNumReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GetPhoneRegVerNumReq;

        /**
         * Decodes a GetPhoneRegVerNumReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetPhoneRegVerNumReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GetPhoneRegVerNumReq;

        /**
         * Verifies a GetPhoneRegVerNumReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GetPhoneRegVerNumReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetPhoneRegVerNumReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GetPhoneRegVerNumReq;

        /**
         * Creates a plain object from a GetPhoneRegVerNumReq message. Also converts values to other types if specified.
         * @param message GetPhoneRegVerNumReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GetPhoneRegVerNumReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GetPhoneRegVerNumReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GetPhoneRegVerNumRes. */
    interface IGetPhoneRegVerNumRes {
    }

    /** Represents a GetPhoneRegVerNumRes. */
    class GetPhoneRegVerNumRes implements IGetPhoneRegVerNumRes {

        /**
         * Constructs a new GetPhoneRegVerNumRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGetPhoneRegVerNumRes);

        /**
         * Creates a new GetPhoneRegVerNumRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetPhoneRegVerNumRes instance
         */
        public static create(properties?: AuthProto.IGetPhoneRegVerNumRes): AuthProto.GetPhoneRegVerNumRes;

        /**
         * Encodes the specified GetPhoneRegVerNumRes message. Does not implicitly {@link AuthProto.GetPhoneRegVerNumRes.verify|verify} messages.
         * @param message GetPhoneRegVerNumRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGetPhoneRegVerNumRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetPhoneRegVerNumRes message, length delimited. Does not implicitly {@link AuthProto.GetPhoneRegVerNumRes.verify|verify} messages.
         * @param message GetPhoneRegVerNumRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGetPhoneRegVerNumRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetPhoneRegVerNumRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetPhoneRegVerNumRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GetPhoneRegVerNumRes;

        /**
         * Decodes a GetPhoneRegVerNumRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetPhoneRegVerNumRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GetPhoneRegVerNumRes;

        /**
         * Verifies a GetPhoneRegVerNumRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GetPhoneRegVerNumRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetPhoneRegVerNumRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GetPhoneRegVerNumRes;

        /**
         * Creates a plain object from a GetPhoneRegVerNumRes message. Also converts values to other types if specified.
         * @param message GetPhoneRegVerNumRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GetPhoneRegVerNumRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GetPhoneRegVerNumRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a BindPhoneNumberReq. */
    interface IBindPhoneNumberReq {
    }

    /** Represents a BindPhoneNumberReq. */
    class BindPhoneNumberReq implements IBindPhoneNumberReq {

        /**
         * Constructs a new BindPhoneNumberReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IBindPhoneNumberReq);

        /**
         * Creates a new BindPhoneNumberReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindPhoneNumberReq instance
         */
        public static create(properties?: AuthProto.IBindPhoneNumberReq): AuthProto.BindPhoneNumberReq;

        /**
         * Encodes the specified BindPhoneNumberReq message. Does not implicitly {@link AuthProto.BindPhoneNumberReq.verify|verify} messages.
         * @param message BindPhoneNumberReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IBindPhoneNumberReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindPhoneNumberReq message, length delimited. Does not implicitly {@link AuthProto.BindPhoneNumberReq.verify|verify} messages.
         * @param message BindPhoneNumberReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IBindPhoneNumberReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindPhoneNumberReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindPhoneNumberReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.BindPhoneNumberReq;

        /**
         * Decodes a BindPhoneNumberReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindPhoneNumberReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.BindPhoneNumberReq;

        /**
         * Verifies a BindPhoneNumberReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a BindPhoneNumberReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindPhoneNumberReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.BindPhoneNumberReq;

        /**
         * Creates a plain object from a BindPhoneNumberReq message. Also converts values to other types if specified.
         * @param message BindPhoneNumberReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.BindPhoneNumberReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this BindPhoneNumberReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a BindPhoneNumberRes. */
    interface IBindPhoneNumberRes {
    }

    /** Represents a BindPhoneNumberRes. */
    class BindPhoneNumberRes implements IBindPhoneNumberRes {

        /**
         * Constructs a new BindPhoneNumberRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IBindPhoneNumberRes);

        /**
         * Creates a new BindPhoneNumberRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindPhoneNumberRes instance
         */
        public static create(properties?: AuthProto.IBindPhoneNumberRes): AuthProto.BindPhoneNumberRes;

        /**
         * Encodes the specified BindPhoneNumberRes message. Does not implicitly {@link AuthProto.BindPhoneNumberRes.verify|verify} messages.
         * @param message BindPhoneNumberRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IBindPhoneNumberRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindPhoneNumberRes message, length delimited. Does not implicitly {@link AuthProto.BindPhoneNumberRes.verify|verify} messages.
         * @param message BindPhoneNumberRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IBindPhoneNumberRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindPhoneNumberRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindPhoneNumberRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.BindPhoneNumberRes;

        /**
         * Decodes a BindPhoneNumberRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindPhoneNumberRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.BindPhoneNumberRes;

        /**
         * Verifies a BindPhoneNumberRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a BindPhoneNumberRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindPhoneNumberRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.BindPhoneNumberRes;

        /**
         * Creates a plain object from a BindPhoneNumberRes message. Also converts values to other types if specified.
         * @param message BindPhoneNumberRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.BindPhoneNumberRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this BindPhoneNumberRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a ResetUserPwdReq. */
    interface IResetUserPwdReq {
    }

    /** Represents a ResetUserPwdReq. */
    class ResetUserPwdReq implements IResetUserPwdReq {

        /**
         * Constructs a new ResetUserPwdReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IResetUserPwdReq);

        /**
         * Creates a new ResetUserPwdReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResetUserPwdReq instance
         */
        public static create(properties?: AuthProto.IResetUserPwdReq): AuthProto.ResetUserPwdReq;

        /**
         * Encodes the specified ResetUserPwdReq message. Does not implicitly {@link AuthProto.ResetUserPwdReq.verify|verify} messages.
         * @param message ResetUserPwdReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IResetUserPwdReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResetUserPwdReq message, length delimited. Does not implicitly {@link AuthProto.ResetUserPwdReq.verify|verify} messages.
         * @param message ResetUserPwdReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IResetUserPwdReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResetUserPwdReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResetUserPwdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.ResetUserPwdReq;

        /**
         * Decodes a ResetUserPwdReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResetUserPwdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.ResetUserPwdReq;

        /**
         * Verifies a ResetUserPwdReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a ResetUserPwdReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResetUserPwdReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.ResetUserPwdReq;

        /**
         * Creates a plain object from a ResetUserPwdReq message. Also converts values to other types if specified.
         * @param message ResetUserPwdReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.ResetUserPwdReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this ResetUserPwdReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a ResetUserPwdRes. */
    interface IResetUserPwdRes {
    }

    /** Represents a ResetUserPwdRes. */
    class ResetUserPwdRes implements IResetUserPwdRes {

        /**
         * Constructs a new ResetUserPwdRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IResetUserPwdRes);

        /**
         * Creates a new ResetUserPwdRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResetUserPwdRes instance
         */
        public static create(properties?: AuthProto.IResetUserPwdRes): AuthProto.ResetUserPwdRes;

        /**
         * Encodes the specified ResetUserPwdRes message. Does not implicitly {@link AuthProto.ResetUserPwdRes.verify|verify} messages.
         * @param message ResetUserPwdRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IResetUserPwdRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResetUserPwdRes message, length delimited. Does not implicitly {@link AuthProto.ResetUserPwdRes.verify|verify} messages.
         * @param message ResetUserPwdRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IResetUserPwdRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResetUserPwdRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResetUserPwdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.ResetUserPwdRes;

        /**
         * Decodes a ResetUserPwdRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResetUserPwdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.ResetUserPwdRes;

        /**
         * Verifies a ResetUserPwdRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a ResetUserPwdRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResetUserPwdRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.ResetUserPwdRes;

        /**
         * Creates a plain object from a ResetUserPwdRes message. Also converts values to other types if specified.
         * @param message ResetUserPwdRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.ResetUserPwdRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this ResetUserPwdRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a LoginOutReq. */
    interface ILoginOutReq {
    }

    /** Represents a LoginOutReq. */
    class LoginOutReq implements ILoginOutReq {

        /**
         * Constructs a new LoginOutReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.ILoginOutReq);

        /**
         * Creates a new LoginOutReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginOutReq instance
         */
        public static create(properties?: AuthProto.ILoginOutReq): AuthProto.LoginOutReq;

        /**
         * Encodes the specified LoginOutReq message. Does not implicitly {@link AuthProto.LoginOutReq.verify|verify} messages.
         * @param message LoginOutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.ILoginOutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginOutReq message, length delimited. Does not implicitly {@link AuthProto.LoginOutReq.verify|verify} messages.
         * @param message LoginOutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.ILoginOutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginOutReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.LoginOutReq;

        /**
         * Decodes a LoginOutReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginOutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.LoginOutReq;

        /**
         * Verifies a LoginOutReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a LoginOutReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginOutReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.LoginOutReq;

        /**
         * Creates a plain object from a LoginOutReq message. Also converts values to other types if specified.
         * @param message LoginOutReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.LoginOutReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this LoginOutReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a LoginOutRes. */
    interface ILoginOutRes {

        /** LoginOutRes status */
        status: number;
    }

    /** Represents a LoginOutRes. */
    class LoginOutRes implements ILoginOutRes {

        /**
         * Constructs a new LoginOutRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.ILoginOutRes);

        /** LoginOutRes status. */
        public status: number;

        /**
         * Creates a new LoginOutRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginOutRes instance
         */
        public static create(properties?: AuthProto.ILoginOutRes): AuthProto.LoginOutRes;

        /**
         * Encodes the specified LoginOutRes message. Does not implicitly {@link AuthProto.LoginOutRes.verify|verify} messages.
         * @param message LoginOutRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.ILoginOutRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginOutRes message, length delimited. Does not implicitly {@link AuthProto.LoginOutRes.verify|verify} messages.
         * @param message LoginOutRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.ILoginOutRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginOutRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginOutRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.LoginOutRes;

        /**
         * Decodes a LoginOutRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginOutRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.LoginOutRes;

        /**
         * Verifies a LoginOutRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a LoginOutRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginOutRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.LoginOutRes;

        /**
         * Creates a plain object from a LoginOutRes message. Also converts values to other types if specified.
         * @param message LoginOutRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.LoginOutRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this LoginOutRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an EditProfileReq. */
    interface IEditProfileReq {

        /** EditProfileReq unick */
        unick: string;

        /** EditProfileReq uface */
        uface: number;

        /** EditProfileReq usex */
        usex: number;
    }

    /** Represents an EditProfileReq. */
    class EditProfileReq implements IEditProfileReq {

        /**
         * Constructs a new EditProfileReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IEditProfileReq);

        /** EditProfileReq unick. */
        public unick: string;

        /** EditProfileReq uface. */
        public uface: number;

        /** EditProfileReq usex. */
        public usex: number;

        /**
         * Creates a new EditProfileReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EditProfileReq instance
         */
        public static create(properties?: AuthProto.IEditProfileReq): AuthProto.EditProfileReq;

        /**
         * Encodes the specified EditProfileReq message. Does not implicitly {@link AuthProto.EditProfileReq.verify|verify} messages.
         * @param message EditProfileReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IEditProfileReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EditProfileReq message, length delimited. Does not implicitly {@link AuthProto.EditProfileReq.verify|verify} messages.
         * @param message EditProfileReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IEditProfileReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EditProfileReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EditProfileReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.EditProfileReq;

        /**
         * Decodes an EditProfileReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EditProfileReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.EditProfileReq;

        /**
         * Verifies an EditProfileReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an EditProfileReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EditProfileReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.EditProfileReq;

        /**
         * Creates a plain object from an EditProfileReq message. Also converts values to other types if specified.
         * @param message EditProfileReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.EditProfileReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this EditProfileReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an EditProfileRes. */
    interface IEditProfileRes {

        /** EditProfileRes status */
        status: number;
    }

    /** Represents an EditProfileRes. */
    class EditProfileRes implements IEditProfileRes {

        /**
         * Constructs a new EditProfileRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IEditProfileRes);

        /** EditProfileRes status. */
        public status: number;

        /**
         * Creates a new EditProfileRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EditProfileRes instance
         */
        public static create(properties?: AuthProto.IEditProfileRes): AuthProto.EditProfileRes;

        /**
         * Encodes the specified EditProfileRes message. Does not implicitly {@link AuthProto.EditProfileRes.verify|verify} messages.
         * @param message EditProfileRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IEditProfileRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EditProfileRes message, length delimited. Does not implicitly {@link AuthProto.EditProfileRes.verify|verify} messages.
         * @param message EditProfileRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IEditProfileRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EditProfileRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EditProfileRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.EditProfileRes;

        /**
         * Decodes an EditProfileRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EditProfileRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.EditProfileRes;

        /**
         * Verifies an EditProfileRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an EditProfileRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EditProfileRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.EditProfileRes;

        /**
         * Creates a plain object from an EditProfileRes message. Also converts values to other types if specified.
         * @param message EditProfileRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.EditProfileRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this EditProfileRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an AccountUpgradeReq. */
    interface IAccountUpgradeReq {

        /** AccountUpgradeReq uname */
        uname: string;

        /** AccountUpgradeReq upwdMd5 */
        upwdMd5: string;
    }

    /** Represents an AccountUpgradeReq. */
    class AccountUpgradeReq implements IAccountUpgradeReq {

        /**
         * Constructs a new AccountUpgradeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IAccountUpgradeReq);

        /** AccountUpgradeReq uname. */
        public uname: string;

        /** AccountUpgradeReq upwdMd5. */
        public upwdMd5: string;

        /**
         * Creates a new AccountUpgradeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountUpgradeReq instance
         */
        public static create(properties?: AuthProto.IAccountUpgradeReq): AuthProto.AccountUpgradeReq;

        /**
         * Encodes the specified AccountUpgradeReq message. Does not implicitly {@link AuthProto.AccountUpgradeReq.verify|verify} messages.
         * @param message AccountUpgradeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IAccountUpgradeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccountUpgradeReq message, length delimited. Does not implicitly {@link AuthProto.AccountUpgradeReq.verify|verify} messages.
         * @param message AccountUpgradeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IAccountUpgradeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountUpgradeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountUpgradeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.AccountUpgradeReq;

        /**
         * Decodes an AccountUpgradeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountUpgradeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.AccountUpgradeReq;

        /**
         * Verifies an AccountUpgradeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an AccountUpgradeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountUpgradeReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.AccountUpgradeReq;

        /**
         * Creates a plain object from an AccountUpgradeReq message. Also converts values to other types if specified.
         * @param message AccountUpgradeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.AccountUpgradeReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this AccountUpgradeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of an AccountUpgradeRes. */
    interface IAccountUpgradeRes {

        /** AccountUpgradeRes status */
        status: number;
    }

    /** Represents an AccountUpgradeRes. */
    class AccountUpgradeRes implements IAccountUpgradeRes {

        /**
         * Constructs a new AccountUpgradeRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IAccountUpgradeRes);

        /** AccountUpgradeRes status. */
        public status: number;

        /**
         * Creates a new AccountUpgradeRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountUpgradeRes instance
         */
        public static create(properties?: AuthProto.IAccountUpgradeRes): AuthProto.AccountUpgradeRes;

        /**
         * Encodes the specified AccountUpgradeRes message. Does not implicitly {@link AuthProto.AccountUpgradeRes.verify|verify} messages.
         * @param message AccountUpgradeRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IAccountUpgradeRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccountUpgradeRes message, length delimited. Does not implicitly {@link AuthProto.AccountUpgradeRes.verify|verify} messages.
         * @param message AccountUpgradeRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IAccountUpgradeRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountUpgradeRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountUpgradeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.AccountUpgradeRes;

        /**
         * Decodes an AccountUpgradeRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountUpgradeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.AccountUpgradeRes;

        /**
         * Verifies an AccountUpgradeRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an AccountUpgradeRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountUpgradeRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.AccountUpgradeRes;

        /**
         * Creates a plain object from an AccountUpgradeRes message. Also converts values to other types if specified.
         * @param message AccountUpgradeRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.AccountUpgradeRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this AccountUpgradeRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GetUserCenterInfoReq. */
    interface IGetUserCenterInfoReq {
    }

    /** Represents a GetUserCenterInfoReq. */
    class GetUserCenterInfoReq implements IGetUserCenterInfoReq {

        /**
         * Constructs a new GetUserCenterInfoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGetUserCenterInfoReq);

        /**
         * Creates a new GetUserCenterInfoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetUserCenterInfoReq instance
         */
        public static create(properties?: AuthProto.IGetUserCenterInfoReq): AuthProto.GetUserCenterInfoReq;

        /**
         * Encodes the specified GetUserCenterInfoReq message. Does not implicitly {@link AuthProto.GetUserCenterInfoReq.verify|verify} messages.
         * @param message GetUserCenterInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGetUserCenterInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetUserCenterInfoReq message, length delimited. Does not implicitly {@link AuthProto.GetUserCenterInfoReq.verify|verify} messages.
         * @param message GetUserCenterInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGetUserCenterInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetUserCenterInfoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetUserCenterInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GetUserCenterInfoReq;

        /**
         * Decodes a GetUserCenterInfoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetUserCenterInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GetUserCenterInfoReq;

        /**
         * Verifies a GetUserCenterInfoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GetUserCenterInfoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetUserCenterInfoReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GetUserCenterInfoReq;

        /**
         * Creates a plain object from a GetUserCenterInfoReq message. Also converts values to other types if specified.
         * @param message GetUserCenterInfoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GetUserCenterInfoReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GetUserCenterInfoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a GetUserCenterInfoRes. */
    interface IGetUserCenterInfoRes {

        /** GetUserCenterInfoRes userCenterInfoString */
        userCenterInfoString: string;
    }

    /** Represents a GetUserCenterInfoRes. */
    class GetUserCenterInfoRes implements IGetUserCenterInfoRes {

        /**
         * Constructs a new GetUserCenterInfoRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IGetUserCenterInfoRes);

        /** GetUserCenterInfoRes userCenterInfoString. */
        public userCenterInfoString: string;

        /**
         * Creates a new GetUserCenterInfoRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetUserCenterInfoRes instance
         */
        public static create(properties?: AuthProto.IGetUserCenterInfoRes): AuthProto.GetUserCenterInfoRes;

        /**
         * Encodes the specified GetUserCenterInfoRes message. Does not implicitly {@link AuthProto.GetUserCenterInfoRes.verify|verify} messages.
         * @param message GetUserCenterInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IGetUserCenterInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetUserCenterInfoRes message, length delimited. Does not implicitly {@link AuthProto.GetUserCenterInfoRes.verify|verify} messages.
         * @param message GetUserCenterInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IGetUserCenterInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetUserCenterInfoRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetUserCenterInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.GetUserCenterInfoRes;

        /**
         * Decodes a GetUserCenterInfoRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetUserCenterInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.GetUserCenterInfoRes;

        /**
         * Verifies a GetUserCenterInfoRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a GetUserCenterInfoRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetUserCenterInfoRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.GetUserCenterInfoRes;

        /**
         * Creates a plain object from a GetUserCenterInfoRes message. Also converts values to other types if specified.
         * @param message GetUserCenterInfoRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.GetUserCenterInfoRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this GetUserCenterInfoRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a ReloginRes. */
    interface IReloginRes {
    }

    /** Represents a ReloginRes. */
    class ReloginRes implements IReloginRes {

        /**
         * Constructs a new ReloginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IReloginRes);

        /**
         * Creates a new ReloginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReloginRes instance
         */
        public static create(properties?: AuthProto.IReloginRes): AuthProto.ReloginRes;

        /**
         * Encodes the specified ReloginRes message. Does not implicitly {@link AuthProto.ReloginRes.verify|verify} messages.
         * @param message ReloginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IReloginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReloginRes message, length delimited. Does not implicitly {@link AuthProto.ReloginRes.verify|verify} messages.
         * @param message ReloginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IReloginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReloginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReloginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.ReloginRes;

        /**
         * Decodes a ReloginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReloginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.ReloginRes;

        /**
         * Verifies a ReloginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a ReloginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReloginRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.ReloginRes;

        /**
         * Creates a plain object from a ReloginRes message. Also converts values to other types if specified.
         * @param message ReloginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.ReloginRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this ReloginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }

    /** Properties of a UserLostConnectRes. */
    interface IUserLostConnectRes {
    }

    /** Represents a UserLostConnectRes. */
    class UserLostConnectRes implements IUserLostConnectRes {

        /**
         * Constructs a new UserLostConnectRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: AuthProto.IUserLostConnectRes);

        /**
         * Creates a new UserLostConnectRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLostConnectRes instance
         */
        public static create(properties?: AuthProto.IUserLostConnectRes): AuthProto.UserLostConnectRes;

        /**
         * Encodes the specified UserLostConnectRes message. Does not implicitly {@link AuthProto.UserLostConnectRes.verify|verify} messages.
         * @param message UserLostConnectRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: AuthProto.IUserLostConnectRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLostConnectRes message, length delimited. Does not implicitly {@link AuthProto.UserLostConnectRes.verify|verify} messages.
         * @param message UserLostConnectRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: AuthProto.IUserLostConnectRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLostConnectRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLostConnectRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AuthProto.UserLostConnectRes;

        /**
         * Decodes a UserLostConnectRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLostConnectRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AuthProto.UserLostConnectRes;

        /**
         * Verifies a UserLostConnectRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a UserLostConnectRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLostConnectRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): AuthProto.UserLostConnectRes;

        /**
         * Creates a plain object from a UserLostConnectRes message. Also converts values to other types if specified.
         * @param message UserLostConnectRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AuthProto.UserLostConnectRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this UserLostConnectRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }
}

/** Namespace TalkProto. */
export namespace TalkProto {

    /** Cmd enum. */
    enum Cmd {
        INVALED = 0,
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.LoginReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.LoginRes;

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @param message LoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.LoginRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this LoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an ExitReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.ExitReq;

        /**
         * Creates a plain object from an ExitReq message. Also converts values to other types if specified.
         * @param message ExitReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.ExitReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this ExitReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an ExitRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExitRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.ExitRes;

        /**
         * Creates a plain object from an ExitRes message. Also converts values to other types if specified.
         * @param message ExitRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.ExitRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this ExitRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a SendMsgReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgReq
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.SendMsgReq;

        /**
         * Creates a plain object from a SendMsgReq message. Also converts values to other types if specified.
         * @param message SendMsgReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.SendMsgReq, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this SendMsgReq to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates a SendMsgRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgRes
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.SendMsgRes;

        /**
         * Creates a plain object from a SendMsgRes message. Also converts values to other types if specified.
         * @param message SendMsgRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.SendMsgRes, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this SendMsgRes to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an OnUserLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnUserLogin
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.OnUserLogin;

        /**
         * Creates a plain object from an OnUserLogin message. Also converts values to other types if specified.
         * @param message OnUserLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnUserLogin, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this OnUserLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an OnUserExit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnUserExit
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.OnUserExit;

        /**
         * Creates a plain object from an OnUserExit message. Also converts values to other types if specified.
         * @param message OnUserExit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnUserExit, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this OnUserExit to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
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
        public static verify(message: [ 'object' ].<string, any>): (string|null);

        /**
         * Creates an OnSendMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OnSendMsg
         */
        public static fromObject(object: [ 'object' ].<string, any>): TalkProto.OnSendMsg;

        /**
         * Creates a plain object from an OnSendMsg message. Also converts values to other types if specified.
         * @param message OnSendMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TalkProto.OnSendMsg, options?: $protobuf.IConversionOptions): [ 'object' ].<string, any>;

        /**
         * Converts this OnSendMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): [ 'object' ].<string, any>;
    }
}
