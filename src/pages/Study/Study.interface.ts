import { StudyInfo } from '@api/dto';

export interface ModalInfo {
  mode: 'Add' | 'Edit';
  selectedStudy?: StudyInfo;
}
