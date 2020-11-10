import React, { useContext, useState, useEffect } from 'react'
import { Text, Button, VStack, HStack, Input } from '@chakra-ui/core'
import { ethers } from 'ethers'
import { Web3Context } from './hooks/useWeb3'
import {
  SimpleStorage_address,
  SimpleStorage_abi,
} from './contracts/SimpleStorage'

function App() {
  const [web3State, login] = useContext(Web3Context)
  const [simpleStorage, setSimpleStorage] = useState(null)
  const [getValue, setGetValue] = useState(0)
  const [inputValue, setInputValue] = useState(0)

  const handleOnClickGet = async () => {
    const res = await simpleStorage.get()
    setGetValue(res.toString())
  }

  const handleOnClickSet = async () => {
    const tx = await simpleStorage.set(inputValue)
  }

  useEffect(() => {
    if (web3State.signer !== null) {
      setSimpleStorage(
        new ethers.Contract(
          SimpleStorage_address,
          SimpleStorage_abi,
          web3State.signer
        )
      )
    }
  }, [web3State.signer])

  // web3State.is_web3 ??
  // web3State.is_logged ??
  // web3State.chain_id ??
  // web3Sate.account && provider et signer

  return (
    <>
      <Text>Web3: {web3State.is_web3 ? 'injected' : 'no-injected'}</Text>
      <Text>Network id: {web3State.chain_id}</Text>
      <Text>Network name: {web3State.network_name}</Text>
      <Text>MetaMask installed: {web3State.is_metamask ? 'yes' : 'no'}</Text>
      <Text>logged: {web3State.is_logged ? 'yes' : 'no'}</Text>
      <Text>{web3State.account}</Text>
      {!web3State.is_logged && (
        <>
          <Button onClick={login}>login</Button>
        </>
      )}
      {simpleStorage !== null && web3State.chain_id === 4 && (
        <>
          <HStack>
            <Button onClick={handleOnClickGet}>GET</Button>
            <Text>{getValue}</Text>
          </HStack>
          <HStack>
            <Button onClick={handleOnClickSet}>SET</Button>
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.currentTarget.value)
              }}
            />
          </HStack>
        </>
      )}
    </>
  )
}

export default App