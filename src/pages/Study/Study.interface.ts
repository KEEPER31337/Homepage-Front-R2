import { StudyListInfo } from '@api/dto';

export interface ModalInfo {
  mode: 'Add' | 'Modify';
  selectedStudy?: StudyListInfo;
}
