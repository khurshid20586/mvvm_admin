// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes, isCollapsed } = props;
  // SIDEBAR
  return (
    <Flex 
      direction='column' 
      height='100%' 
      pt={isCollapsed ? '15px' : '25px'} 
      px={isCollapsed ? '8px' : '16px'}
      borderRadius='30px'
    >
      {!isCollapsed && <Brand />}
      <Stack direction='column' mb='auto' mt={isCollapsed ? '4px' : '8px'}>
        <Box ps={isCollapsed ? '0px' : '20px'} pe={{ md: isCollapsed ? '0px' : "16px", "2xl": isCollapsed ? '0px' : "1px" }}>
          <Links routes={routes} isCollapsed={isCollapsed} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
