import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast, HStack, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUserCount, setNewUserCount] = useState(1);
  const [newBankCount, setNewBankCount] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
    fetchBanks();
    const interval = setInterval(() => {
      cleanUpData();
    }, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    // Fetch users from the backend
    // Replace with your backend API endpoint
    const response = await fetch("/api/users/");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };

  const fetchBanks = async () => {
    // Fetch banks from the backend
    // Replace with your backend API endpoint
    const response = await fetch("/api/banks/");
    const data = await response.json();
    setBanks(data);
    setIsLoading(false);
  };

  const cleanUpData = async () => {
    // Clean up unrelated data
    // Replace with your backend API endpoint
    await fetch("/api/cleanup/", { method: "POST" });
    fetchUsers();
    fetchBanks();
  };

  const addUser = async () => {
    // Add new users
    // Replace with your backend API endpoint
    const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${newUserCount}`);
    const data = await response.json();
    await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchUsers();
    toast({ title: "Users added successfully", status: "success", duration: 3000, isClosable: true });
  };

  const addBank = async () => {
    // Add new banks
    // Replace with your backend API endpoint
    const response = await fetch(`https://random-data-api.com/api/bank/random_bank?size=${newBankCount}`);
    const data = await response.json();
    await fetch("/api/banks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    fetchBanks();
    toast({ title: "Banks added successfully", status: "success", duration: 3000, isClosable: true });
  };

  const deleteUser = async (id) => {
    // Delete user
    // Replace with your backend API endpoint
    await fetch(`/api/users/${id}/`, { method: "DELETE" });
    fetchUsers();
    toast({ title: "User deleted successfully", status: "success", duration: 3000, isClosable: true });
  };

  const deleteBank = async (id) => {
    // Delete bank
    // Replace with your backend API endpoint
    await fetch(`/api/banks/${id}/`, { method: "DELETE" });
    fetchBanks();
    toast({ title: "Bank deleted successfully", status: "success", duration: 3000, isClosable: true });
  };

  const editUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const editBank = (bank) => {
    setSelectedBank(bank);
    onOpen();
  };

  const handleUserEdit = async () => {
    // Handle user edit
    // Replace with your backend API endpoint
    await fetch(`/api/users/${selectedUser.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    });
    fetchUsers();
    onClose();
    toast({ title: "User updated successfully", status: "success", duration: 3000, isClosable: true });
  };

  const handleBankEdit = async () => {
    // Handle bank edit
    // Replace with your backend API endpoint
    await fetch(`/api/banks/${selectedBank.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedBank),
    });
    fetchBanks();
    onClose();
    toast({ title: "Bank updated successfully", status: "success", duration: 3000, isClosable: true });
  };

  return (
    <Container centerContent maxW="container.xl" py={8}>
      <VStack spacing={8} width="100%">
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="2xl">Users</Text>
          <HStack>
            <Input type="number" value={newUserCount} onChange={(e) => setNewUserCount(e.target.value)} width="100px" />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addUser}>
              Add Users
            </Button>
          </HStack>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.first_name}</Td>
                <Td>{user.last_name}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => editUser(user)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => deleteUser(user.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="2xl">Banks</Text>
          <HStack>
            <Input type="number" value={newBankCount} onChange={(e) => setNewBankCount(e.target.value)} width="100px" />
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addBank}>
              Add Banks
            </Button>
          </HStack>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Bank Name</Th>
              <Th>Routing Number</Th>
              <Th>SWIFT/BIC</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {banks.map((bank) => (
              <Tr key={bank.id}>
                <Td>{bank.id}</Td>
                <Td>{bank.bank_name}</Td>
                <Td>{bank.routing_number}</Td>
                <Td>{bank.swift_bic}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => editBank(bank)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => deleteBank(bank.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedUser ? "Edit User" : "Edit Bank"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser ? (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input value={selectedUser.first_name} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input value={selectedUser.last_name} onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                </FormControl>
              </VStack>
            ) : (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Bank Name</FormLabel>
                  <Input value={selectedBank.bank_name} onChange={(e) => setSelectedBank({ ...selectedBank, bank_name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Routing Number</FormLabel>
                  <Input value={selectedBank.routing_number} onChange={(e) => setSelectedBank({ ...selectedBank, routing_number: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>SWIFT/BIC</FormLabel>
                  <Input value={selectedBank.swift_bic} onChange={(e) => setSelectedBank({ ...selectedBank, swift_bic: e.target.value })} />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={selectedUser ? handleUserEdit : handleBankEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
