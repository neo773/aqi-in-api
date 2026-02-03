import { SensorName } from "../common/sensor-name.type";
import { RankType } from "../common/rank-type.type";

export interface GetRankingParams {
  sensorname: SensorName;
  type: RankType;
  limit?: number;
}
