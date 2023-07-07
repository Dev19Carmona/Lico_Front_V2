import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'

export const TabsGeneral = ({ index, components }) => {
    
    const colorsA = (index) =>{
        let colors = [];
        for (let i = 0; i < index.length; i++) {
           colors.push('gray.50')
        }
        return colors 
    }
    const colorsB = (index) =>{
        let colors = [];
        for (let i = 0; i < index.length; i++) {
           colors.push('gray.900')
        }
        return colors 
    }
    
    const colors = useColorModeValue(
        colorsA(index),
        colorsB(index),
      )
      const [tabIndex, setTabIndex] = useState(0)
      const bg = colors[tabIndex]
    return (
        <Tabs borderRadius={9} onChange={(index) => setTabIndex(index)} bg={bg} variant='soft-rounded' colorScheme='blue'>
            <TabList>
                {
                    index.map((e, i) => (
                        <Tab key={i}>{e.name}</Tab>

                    ))
                }
            </TabList>
            <TabPanels>
                {
                    components.map((component,i)=>(

                        <TabPanel key={i}>
                            {component}
                        </TabPanel>
                    ))
                }
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>tres!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}