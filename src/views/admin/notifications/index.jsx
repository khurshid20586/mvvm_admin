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
  useToast,
  Input,
  Switch,
  FormControl,
  HStack,
  InputGroup,
  InputLeftAddon,
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
  const [whatsappMessage, setWhatsappMessage] = React.useState("");
  const [smsMessage, setSmsMessage] = React.useState("");
  const [channel, setChannel] = React.useState("whatsapp"); // 'whatsapp' or 'sms'
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleSend = async () => {
    const selectedMessage = channel === 'whatsapp' ? whatsappMessage : smsMessage;
    if (!mobile || !selectedMessage) {
      toast({
        title: 'Validation',
        description: 'Please enter both mobile number and message for the selected channel.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Branch: WhatsApp (GET) vs SMS (POST JSON)
    if (channel === 'whatsapp') {
      // Use a relative path so CRA dev proxy (`src/setupProxy.js`) can forward the request
      const base = '/wa/api/v1/notification';

      // Normalize mobile: strip non-digits and ensure country code '91' is attached
      const normalizeMobile = (m) => {
        let digits = String(m || "").replace(/\D/g, '');
        if (digits.startsWith('91')) return digits;
        if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
        if (digits.length === 10) return '91' + digits;
        // fallback: return digits as-is
        return digits;
      };

      const sendTo = normalizeMobile(mobile);
      if (!sendTo || sendTo.length < 12) {
        toast({
          title: 'Validation',
          description: 'Please enter a valid 10-digit mobile number.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const params = new URLSearchParams({
        sendTo: sendTo,
        message: selectedMessage,
      });
      const url = `${base}?${params.toString()}`;
      setLoading(true);
      try {
        const res = await fetch(url, { method: 'GET' });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        let data = null;
        try {
          data = await res.json();
        } catch (e) {
          console.log('Response is not JSON:', e);
        }
        console.log('Send response:', data || 'OK');
        toast({
          title: 'Success',
          description: 'Message sent successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setMobile('');
        setWhatsappMessage('');
        setSmsMessage('');
      } catch (err) {
        console.error('Send error:', err);
        toast({
          title: 'Error',
          description: `Failed to send message: ${err.message}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // SMS: POST JSON to /api/v1/notification (proxied to SMS backend)
      const base = '/api/v1/notification';

      // Normalize sendTo list: accept comma-separated numbers, strip non-digits, return 10-digit numbers
      const normalizeSmsList = (input) => {
        const parts = String(input || "").split(/[,;\s]+/).filter(Boolean);
        const cleaned = parts.map((p) => {
          let digits = String(p).replace(/\D/g, '');
          if (digits.startsWith('91')) digits = digits.replace(/^91/, '');
          if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
          return digits;
        }).filter((d) => d.length === 10);
        return cleaned.join(',');
      };

      const sendToList = normalizeSmsList(mobile);
      if (!sendToList) {
        toast({
          title: 'Validation',
          description: 'Please enter a valid 10-digit mobile number (or comma-separated list).',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Build the POST body using the structure provided in the curl example
      const body = {
        content: selectedMessage,
        route: '30',
        routeId: '30',
        sentVia: '',
        smsType: 'text',
        senderId: 'SCHAMY',
        templateId: '1707172241840231293',
        status: '',
        sendTo: sendToList,
        campaign: '16864',
        groupId: '',
      };

      setLoading(true);
      try {
        const res = await fetch(base, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        let data = null;
        try {
          data = await res.json();
        } catch (e) {}
        console.log('SMS send response:', data || 'OK');
        toast({
          title: 'Success',
          description: 'SMS sent successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setMobile('');
        setWhatsappMessage('');
        setSmsMessage('');
      } catch (err) {
        console.error('SMS send error:', err);
        toast({
          title: 'Error',
          description: `Failed to send SMS: ${err.message}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
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
            <FormControl>
              <HStack justifyContent='space-between'>
                <HStack>
                  <Box as='span' color={textColor} fontSize='sm'>WhatsApp</Box>
                  <Switch
                    isChecked={channel === 'sms'}
                    onChange={(e) => setChannel(e.target.checked ? 'sms' : 'whatsapp')}
                    isDisabled={loading}
                  />
                  <Box as='span' color={textColor} fontSize='sm'>SMS</Box>
                </HStack>
              </HStack>
            </FormControl>
            <FormLabel mb={0}>Mobile Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children='+91' />
              <Input
                placeholder='Enter Mobile Number'
                type='tel'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                isDisabled={loading}
              />
            </InputGroup>
            <FormLabel mb={0}>{channel === 'whatsapp' ? 'WhatsApp Message' : 'SMS Message'}</FormLabel>
            <Textarea
              placeholder={channel === 'whatsapp' ? 'Enter WhatsApp Message' : 'Enter SMS Message'}
              value={channel === 'whatsapp' ? whatsappMessage : smsMessage}
              onChange={(e) => {
                if (channel === 'whatsapp') setWhatsappMessage(e.target.value);
                else setSmsMessage(e.target.value);
              }}
              isDisabled={loading}
            />
            <Button
              colorScheme='brand'
              onClick={handleSend}
              alignSelf='flex-end'
              isLoading={loading}
              loadingText='Sending...'>
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
              
    </Box>
  );
}
