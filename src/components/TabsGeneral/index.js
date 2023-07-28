import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const TabsGeneral = ({ index = [], components = [], opacity = 1 }) => {
  const colorsA = (index) => {
    let colors = [];
    for (let i = 0; i < index.length; i++) {
      colors.push("gray.50");
    }
    return colors;
  };
  const colorsB = (index) => {
    let colors = [];
    for (let i = 0; i < index.length; i++) {
      colors.push("gray.900");
    }
    return colors;
  };

  const colors = useColorModeValue(colorsA(index), colorsB(index));
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
    <Tabs
      borderRadius={9}
      onChange={(index) => setTabIndex(index)}
      bg={bg}
      variant="soft-rounded"
      colorScheme="blue"
      opacity={opacity}
      w={"full"}
    >
      <TransitionGroup component={TabList}>
        {index.map((e, i) => (
          <CSSTransition key={i} classNames="fade" timeout={300}>
            <Tab>{e.name}</Tab>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <TabPanels>
        {components.map((component, i) => (
          <TabPanel key={i}>{component}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
