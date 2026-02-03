import { SensorName } from "../common/sensor-name.type";
import { SearchType } from "../common/search-type.type";

export interface GetHistoryParams {
  slug: string;
  sensorname: SensorName;
  slugType: SearchType;
}
