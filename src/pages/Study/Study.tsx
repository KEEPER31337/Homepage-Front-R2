import React, { Fragment } from 'react';
import { ThemeProvider, Select, Option } from '@material-tailwind/react';

import StudyItem from './StudyItem';

const StudyContent = () => {
  const studyList = [1, 2, 3, 4, 5];
  const theme = {
    select: {
      styles: {
        base: {
          container: {
            position: 'relative',
            width: 'w-[97px]',
            minWidth: 'min-w-[0px]',
          },
        },
      },
    },
    accordion: {
      styles: {
        base: {
          container: {
            bgColor: 'bg-white',
          },
          header: {
            initial: {
              borderColor: 'border-blue-300',
            },
          },
        },
      },
    },
    chip: {
      styles: {
        base: {
          font: 'text-[12px]',
          height: 'h-[22px]',
          paddingRight: 'px-[8px]',
          paddingTop: 'py-[2px]',
        },
        variants: {
          filled: {
            blue: {
              borderRadius: 'rounded-[4px]',
              background: 'bg-blue-300',
              opacity: 'bg-opacity-30',
              color: 'text-white',
            },
          },
        },
        closeButtonColor: {
          blue: {
            height: 'h-[14px]',
            weight: 'w-[14px]',
            borderRadius: 'rounded-[2px]',
            bgColor: 'bg-blue-300',
          },
        },
      },
    },
  };

  return (
    <div className="flex h-full flex-col space-y-[32px] pt-[80px]">
      <p className="border border-black text-blue-300">스터디</p>
      <ThemeProvider value={theme}>
        <div className="flex h-full flex-col space-y-[16px] border border-red-300">
          <div className="flex justify-between">
            <div className="flex space-x-[8px]">
              <Select variant="static" className="" value="2022">
                <Option>2022</Option>
                <Option>2021</Option>
                <Option>2020</Option>
                <Option>2019</Option>
                <Option>2018</Option>
              </Select>
              <Select variant="static" className="" value="1학기">
                <Option>1학기</Option>
                <Option>여름방학</Option>
                <Option>2학기</Option>
                <Option>겨울방학</Option>
              </Select>
            </div>

            <button type="button" className="min-h-[34px] min-w-[70px] border border-blue-300">
              <span className="mx-[24px] my-[8px]">추가</span>
            </button>
          </div>
          <div className="flex h-full justify-center border border-black">
            <div className="w-full max-w-[640px]">
              {studyList?.map((study) => (
                <Fragment key={study}>
                  <StudyItem id={study} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const Study = () => {
  return (
    <div className="flex min-h-[100vh] w-[100vw] bg-gray-300">
      <div className="min-h-[100vh] w-[320px] border border-black bg-white">사이드 바</div>
      <div className="flex w-full justify-center">
        <div className="h-full w-full max-w-[1080px] border border-black bg-white">
          <StudyContent />
        </div>
      </div>
    </div>
  );
};

export default Study;
