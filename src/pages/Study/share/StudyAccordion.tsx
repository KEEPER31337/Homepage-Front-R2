import React, { useState } from 'react';
import { ThemeProvider, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';

interface AccordionProps {
  id: number;
  headerContent: JSX.Element;
  bodyContent: JSX.Element;
}
interface ArrowIconProps {
  open: boolean;
}

const theme = {
  accordion: {
    styles: {
      base: {
        container: {},
        header: {
          initial: {
            fontColor: 'text-white',
            borderColor: 'border-white/[20%]',
            focus: 'focus:outline-0',
            hover: 'hover:text-white hover:bg-gray-600',
          },
          active: {
            fontColor: 'text-white',
          },
        },
        body: {
          bgColor: 'bg-middleBlack',
          fontColor: 'text-white',
        },
      },
    },
  },
};

const Icon = ({ open }: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${open ? 'rotate-180' : ''} h-[20px] w-[20px] transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
const StudyAccordion = ({ id, headerContent, bodyContent }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider value={theme}>
      <Accordion open={open} icon={<Icon open={open} />}>
        <AccordionHeader className="h-[80px]" onClick={() => handleOpen()}>
          {headerContent}
        </AccordionHeader>
        <AccordionBody className="space-y-[30px] py-[30px] px-[41px]">{bodyContent}</AccordionBody>
      </Accordion>
    </ThemeProvider>
  );
};

export default StudyAccordion;
