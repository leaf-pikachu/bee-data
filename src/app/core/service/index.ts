import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { BeeStorageService } from '@bee/core/service/bee-storage.service';
import { BeeDictionaryConstantService } from '@bee/core/service/bee-dictionary-constant.service';
import { BeeService} from '@bee/core/service/bee.service';

/**
 * 基础service集合
 */
export const services = [
  BeeService,
  BeeHttpService,
  BeeStorageService,
  BeeDictionaryConstantService
];
