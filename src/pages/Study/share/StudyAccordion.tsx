import React, { useState } from 'react';
import { ThemeProvider, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';

const theme = {
  accordion: {
    styles: {
      base: {
        container: {
          bgColor: 'bg-white',
        },
        header: {
          initial: {
            borderColor: 'border-pointBlue',
          },
        },
      },
    },
  },
};
interface StudyItemType {
  id: number;
  headerContent: JSX.Element;
  bodyContent: JSX.Element;
}
interface Test {
  id: number;
  open: number;
}
const Icon = ({ id, open }: Test) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? 'rotate-180' : ''} h-[20px] w-[20px] transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
const StudyAccodion = ({ id, headerContent, bodyContent }: StudyItemType) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <ThemeProvider value={theme}>
      <Accordion open={open === id} icon={<Icon id={id} open={open} />}>
        <AccordionHeader className="h-[80px]" onClick={() => handleOpen(id)}>
          {headerContent}
        </AccordionHeader>
        <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">{bodyContent}</AccordionBody>
      </Accordion>
    </ThemeProvider>
  );
};

export default StudyAccodion;
