import Log from '../utils/Log';

class ServiceBase {
	service_name: string = "ServiceBase" ; // 服务名称
	is_transfer: boolean = false; // 是否为转发模块,
    // 收到客户端发来的数据
    static on_recv_client_player_cmd(session:any, stype:number, ctype:number, utag:number, proto_type:number,raw_cmd:any):void{
        Log.info("base on_recv_client_player_cmd")
    }

    //收到连接的服务发过来的数据;
    static on_recv_server_player_cmd (session:any, stype:number, ctype:number, utag:number, proto_type:number, raw_cmd:any):void{
        Log.info("base on_recv_server_player_cmd")
    }

	// 收到客户端断开连接;
	static on_player_disconnect(session:any, stype:number):void{
        Log.info("base on_player_disconnect")
    }
}

export default ServiceBase;