'use client';

import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import Web3 from 'web3';
import contractABI from '../abis/MyContract.json';

const contractAddress = '0xD58C47a068994f637EF8c49bdf08f602fC042b6C';

interface Web3ContextType {
    web3: Web3 | null;
    account: string | null;
    balance: string | null;
    connectWallet: () => Promise<boolean>;
    getContract: () => string | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    const connectWallet = async (): Promise<boolean> => {
        try {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                const accounts = await web3Instance.eth.getAccounts();
                const account = accounts[0];
                const balanceWei = await web3Instance.eth.getBalance(account);
                const balanceEth = web3Instance.utils.fromWei(
                    balanceWei,
                    'ether',
                );

                setWeb3(web3Instance);
                setAccount(account);
                setBalance(balanceEth);

                return true;
            } else {
                console.error('Please install MetaMask!');
                return false;
            }
        } catch (error) {
            console.error('Error in connectWallet: ', error);
            return false;
        }
    };

    const getContract = () => {
        if (!web3 || !account) {
            console.error('Web3 or account not initialized');
            return null;
        }

        try {
            return new web3.eth.Contract(contractABI, contractAddress, {
                from: account,
            });
        } catch (error) {
            console.error('Error in getContract: ', error);
            return null;
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            connectWallet();
        }
    }, []);

    return (
        <Web3Context.Provider
            value={{ web3, account, balance, connectWallet, getContract }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = (): Web3ContextType => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};
