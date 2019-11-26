import GameConf from '../../GameConf';
import NetBus from '../../../netbus/NetBus';
import ServiceManager from '../../../netbus/ServiceManager';
import { Stype } from '../../protocol/Stype';
import MySqlGame from '../../../database/MySqlGame';
import GameHoodleService from './GameHoodleService';

let game_server = GameConf.game_server;
NetBus.start_tcp_server(game_server.host, game_server.port, false);

ServiceManager.register_service(Stype.GameHoodle, GameHoodleService);

var db_game = GameConf.game_database;
MySqlGame.connect(db_game.host, db_game.port, db_game.db_name, db_game.uname, db_game.upwd)
