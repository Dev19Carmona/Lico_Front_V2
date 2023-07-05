import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export const TabsGeneral = ({ index, components }) => {
    return (
        <Tabs variant='soft-rounded' colorScheme='blue'>
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