import React from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Divider,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import resultsData from "./components/results.json";

export default function ResultComponent() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedResult, setSelectedResult] = React.useState(null);

  // Color mode values
  const leftBoxBg = useColorModeValue("white", "gray.700");
  const gridBoxBg = useColorModeValue("white", "gray.700");
  const contentBg = useColorModeValue("gray.50", "gray.800");
  const modalBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("blue.50", "blue.900");
  const infoBg = useColorModeValue("gray.50", "gray.800");
  const metaBg = useColorModeValue("gray.100", "gray.900");
  const mutedText = useColorModeValue("gray.600", "gray.300");
  const mutedText2 = useColorModeValue("gray.600", "gray.400");
  // Table header colors
  const tableHeaderBg = useColorModeValue("linear(to-r, blue.600, blue.500)", "linear(to-r, blue.800, blue.700)");
  const tableHeaderText = useColorModeValue("white", "white");
  // Table stripe colors
  const tableStripeBg = useColorModeValue("blue.50", "gray.700");
  const tableNormalBg = useColorModeValue("white", "gray.800");

  const [form, setForm] = React.useState({
    rollNumber: "",
    admissionNumber: "",
    session: "",
    examType: "",
    standard: "",
    xSmsOrgId: "",
  });

  const [errors, setErrors] = React.useState({});

  const requiredFields = ["xSmsOrgId"];

  const handleChange = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((f) => {
      if (!String(form[f] || "").trim()) newErrors[f] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast({
        title: "Validation error",
        description: "Please fill all mandatory fields.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      toast({
        title: "Processing",
        description: "Sending request...",
        status: "info",
        duration: 2000,
        isClosable: true,
      });

      // perform action (example: console.log payload)
      console.log("Submit payload:", form);

      toast({
        title: "Success",
        description: "Request submitted.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setForm({
        rollNumber: "",
        admissionNumber: "",
        session: "",
        examType: "",
        standard: "",
        xSmsOrgId: "",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err?.message || "Failed to submit",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const openResultModal = (result) => {
    setSelectedResult(result);
    onOpen();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Flex gap={6} p={6} style={{ marginTop: 50, padding: "25px 0" }}>
      <Box
        w={{ base: "100%", md: "320px" }}
        bg={leftBoxBg}
        borderRadius="8px"
        p={4}
        boxShadow="sm"
      >
        <Heading size="sm" mb={4}>
          Add Result
        </Heading>

        <Stack spacing={3}>
          <FormControl isInvalid={!!errors.rollNumber}>
            <FormLabel mb={0}>rollNumber</FormLabel>
            <Input value={form.rollNumber} onChange={handleChange("rollNumber")} />
            <FormErrorMessage>{errors.rollNumber}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.admissionNumber}>
            <FormLabel mb={0}>admissionNumber</FormLabel>
            <Input value={form.admissionNumber} onChange={handleChange("admissionNumber")} />
            <FormErrorMessage>{errors.admissionNumber}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.session}>
            <FormLabel mb={0}>session</FormLabel>
            <Input value={form.session} onChange={handleChange("session")} />
            <FormErrorMessage>{errors.session}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.examType}>
            <FormLabel mb={0}>examType</FormLabel>
            <Input value={form.examType} onChange={handleChange("examType")} />
            <FormErrorMessage>{errors.examType}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.standard}>
            <FormLabel mb={0}>standard</FormLabel>
            <Input value={form.standard} onChange={handleChange("standard")} />
            <FormErrorMessage>{errors.standard}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.xSmsOrgId}>
            <FormLabel mb={0}>x-sms-org-id</FormLabel>
            <Input value={form.xSmsOrgId} onChange={handleChange("xSmsOrgId")} />
            <FormErrorMessage>{errors.xSmsOrgId}</FormErrorMessage>
          </FormControl>

          <Button colorScheme="brand" onClick={handleSubmit} isFullWidth>
            Search
          </Button>

          <Text fontSize="sm" color="gray.500">
            <strong>x-sms-org-id</strong> is mandatory.
          </Text>
        </Stack>
      </Box>

      <Box flex="1">
        <Box
          bg={gridBoxBg}
          borderRadius="8px"
          p={4}
          boxShadow="sm"
          overflowX="auto"
        >
          <Table variant="simple" size="sm">
            <Thead style={{background: "#7677acff"}}>
              <Tr bg={tableHeaderBg}>
                <Th color={tableHeaderText} fontWeight="bold">Result ID</Th>
                <Th color={tableHeaderText} fontWeight="bold">Student Name</Th>
                <Th color={tableHeaderText} fontWeight="bold">School Name</Th>
                <Th color={tableHeaderText} fontWeight="bold">Standard</Th>
                <Th color={tableHeaderText} fontWeight="bold">Exam Type</Th>
                <Th color={tableHeaderText} fontWeight="bold">Org ID</Th>
                <Th color={tableHeaderText} fontWeight="bold">Admission No</Th>
                <Th color={tableHeaderText} fontWeight="bold">Session</Th>
                <Th color={tableHeaderText} fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultsData.map((result, index) => (
                <Tr key={result.resultId} bg={index % 2 === 0 ? tableNormalBg : tableStripeBg}>
                  <Td>{result.resultId}</Td>
                  <Td>{result.studentName}</Td>
                  <Td>{result.schoolName}</Td>
                  <Td>{result.standard}</Td>
                  <Td>{result.examType}</Td>
                  <Td>{result.organizationId}</Td>
                  <Td>{result.admissionNo}</Td>
                  <Td>{result.session}</Td>
                  <Td>
                    <Link
                      color="blue.500"
                      onClick={() => openResultModal(result)}
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Show Result
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Result Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>Result Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedResult && (
              <VStack spacing={4} align="stretch">
                {/* Header Section */}
                <Box
                  bg={headerBg}
                  p={4}
                  borderRadius="md"
                  textAlign="center"
                >
                  <Heading size="md">{selectedResult.schoolName}</Heading>
                  <Text fontSize="sm" color={mutedText}>
                    Session: {selectedResult.session}
                  </Text>
                </Box>

                {/* Student Info */}
                <Box p={4} bg={infoBg} borderRadius="md">
                  <Heading size="sm" mb={3}>
                    Student Information
                  </Heading>
                  <SimpleGrid columns={2} spacing={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Student Name
                      </Text>
                      <Text>{selectedResult.studentName}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Admission No
                      </Text>
                      <Text>{selectedResult.admissionNo}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Standard
                      </Text>
                      <Text>{selectedResult.standard}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Organization ID
                      </Text>
                      <Text>{selectedResult.organizationId}</Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Exam Info */}
                <Box p={4} bg={infoBg} borderRadius="md">
                  <Heading size="sm" mb={3}>
                    Exam Information
                  </Heading>
                  <SimpleGrid columns={2} spacing={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Exam Type
                      </Text>
                      <Text>{selectedResult.examType}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        CGPA
                      </Text>
                      <Badge colorScheme="green">{selectedResult.cgpa}</Badge>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Performance Metrics */}
                <Box p={4} bg={infoBg} borderRadius="md">
                  <Heading size="sm" mb={3}>
                    Performance
                  </Heading>
                  <SimpleGrid columns={2} spacing={3}>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Total Marks
                      </Text>
                      <Text>{selectedResult.totalMarks}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Obtained Marks
                      </Text>
                      <Text>{selectedResult.totalObtainedMarks}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        Percentage
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="green.500">
                        {selectedResult.percentage}%
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Subject Marks */}
                <Box p={4} bg={infoBg} borderRadius="md">
                  <Heading size="sm" mb={3}>
                    Subject-wise Marks
                  </Heading>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Subject</Th>
                        <Th>Max Marks</Th>
                        <Th>Obtained</Th>
                        <Th>Grade</Th>
                        <Th>Examiner</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedResult.subjectMarksDtoList &&
                        selectedResult.subjectMarksDtoList.map((subject) => (
                          <Tr key={subject.id}>
                            <Td>{subject.subjectName}</Td>
                            <Td>{subject.maxMarks}</Td>
                            <Td>{subject.markObtained}</Td>
                            <Td>
                              <Badge colorScheme="purple">
                                {subject.cgpi || "N/A"}
                              </Badge>
                            </Td>
                            <Td>{subject.examinerName}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Box>              

                {/* Action Buttons */}
                <HStack justify="flex-end" spacing={3}>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="blue" onClick={handlePrint}>
                    Print
                  </Button>
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
