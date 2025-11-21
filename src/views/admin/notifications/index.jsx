/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Input,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdMessage,
} from "react-icons/md";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [mobile, setMobile] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (!mobile || !message) {
      alert("Please enter both mobile number and message.");
      return;
    }
    console.log("Sending message", { mobile, message });
    alert("Message sent");
    setMobile("");
    setMessage("");
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdMessage} color={brandColor} />
              }
            />
          }
          name='Whatsaap Messages'
          value='10'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdMessage} color={brandColor} />
              }
            />
          }
          name='SMS Messages'
          value='15'
        />
       
       <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdMessage} color={brandColor} />
              }
            />
          }
          name='Other messages'
          value='15'
        />
      </SimpleGrid>
      <Box mb='24px' display='flex' justifyContent='center'>
        <Box
          bg='white'
          borderRadius='12px'
          p='20px'
          boxShadow='sm'
          w={{ base: "100%", md: "600px" }}>
          <Stack spacing={3}>
            <FormLabel mb={0}>Mobile Number</FormLabel>
            <Input
              placeholder='Enter Mobile Number'
              type='tel'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <FormLabel mb={0}>Message</FormLabel>
            
            <Textarea
              placeholder='Enter Message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              colorScheme='brand'
              onClick={handleSend}
              alignSelf='flex-end'>
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
              
    </Box>
  );
}
