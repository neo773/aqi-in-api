import { HistoryData } from "./history-data.interface";
import { WHOGuideData } from "./who-guide-data.interface";

export interface HistoryDataWithWHO extends HistoryData {
  whoguidedata?: WHOGuideData;
}
