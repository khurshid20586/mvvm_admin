import React from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbar } from "react-scrollbars-custom";
import PropTypes from "prop-types";

// Assets

function Sidebar(props) {
  const { routes } = props;
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";
  let toggleBtnBg = useColorModeValue("gray.100", "navy.700");
  let toggleBtnHover = useColorModeValue("gray.200", "navy.600");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // SIDEBAR
  return (
    <Box display={{ sm: "none", xl: "flex" }} w="100%" position='fixed' minH='100%' alignItems="flex-start">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w={isCollapsed ? '60px' : '300px'}
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}
        position="relative"
      >
        <Scrollbar
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          {!isCollapsed && <Content routes={routes} />}
          {isCollapsed && (
            <Flex direction="column" align="center" p={2} gap={2}>
              {/* Collapsed view - show only icons */}
              <Content routes={routes} isCollapsed={true} />
            </Flex>
          )}
        </Scrollbar>

        {/* Toggle Button */}
        <Tooltip label={isCollapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton
            icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            onClick={toggleSidebar}
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            bg={toggleBtnBg}
            _hover={{ bg: toggleBtnHover }}
            size="sm"
            aria-label="Toggle sidebar"
          />
        </Tooltip>
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbar
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} />
            </Scrollbar>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
