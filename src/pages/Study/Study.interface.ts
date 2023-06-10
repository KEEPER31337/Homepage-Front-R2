import { StudyListInfo } from '@api/dto';

export interface ModalInfo {
  mode: 'Add' | 'Edit';
  selectedStudy?: StudyListInfo;
}
