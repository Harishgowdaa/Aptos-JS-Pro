import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { APTOS_CONNECT_ACCOUNT_URL, isAptosConnectWallet, truncateAddress, useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'sonner';
import { Copy, LogOut, User, Wallet } from 'lucide-react';
import { useAptBalance } from '@aptos-labs/react';
import { useNavigate } from 'react-router';
import { formatApt } from '@aptos-labs/js-pro';
import Header from './header';

const WalletConnected = () => {
    const navigate = useNavigate();
    const { account, connected, disconnect, wallet } = useWallet();
    const { data: balance } = useAptBalance();

    const copyAddress = useCallback(async () => {
        if (!account?.address) return;
        try {
            await navigator.clipboard.writeText(account.address);
            toast.success('Copied wallet address to clipboard.');
        } catch {
            toast.error('Failed to copy wallet address.');
        }
    }, [account?.address]);

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900'>
            {/* Header */}
            {/* <header className='flex items-center justify-between px-6 py-4 bg-gray-500 text-white shadow-md'>
                <div className='flex gap-6'>
                    <Button variant='ghost' className='cursor-pointer' onClick={() => navigate('/transactions')}>
                        Transactions
                    </Button>
                    <Button variant='ghost' className='cursor-pointer' onClick={() => navigate('/send-transaction')}>
                        Send Transaction
                    </Button>
                </div>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='flex gap-2'>
                                <Wallet className='h-5 w-5' />
                                {account?.ansName || truncateAddress(account?.address) || 'Unknown'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onSelect={copyAddress} className='gap-2'>
                                <Copy className='h-4 w-4' /> Copy address
                            </DropdownMenuItem>
                            {wallet && isAptosConnectWallet(wallet) && (
                                <DropdownMenuItem asChild>
                                    <a href={APTOS_CONNECT_ACCOUNT_URL} target='_blank' rel='noopener noreferrer' className='flex gap-2'>
                                        <User className='h-4 w-4' /> Account
                                    </a>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onSelect={disconnect} className='gap-2'>
                                <LogOut className='h-4 w-4' /> Disconnect
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header> */}
            <Header />

            {/* Main Content */}
            <main className='flex flex-col items-center justify-center mt-10 p-6'>
                <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
                    <h2 className='text-xl font-bold mb-4'>Wallet Details</h2>

                    {/* Wallet Balance */}
                    <div className='mb-4'>
                        <span className='text-gray-600'>Balance:</span>
                        <span className='font-semibold text-lg'> {balance ? `${formatApt(balance)} APT` : 'Loading...'}</span>
                    </div>

                    {/* Wallet Address */}
                    <div className='mb-4'>
                        <span className='text-gray-600'>Address:</span>
                        <p className='break-all bg-gray-200 p-2 rounded'>{account?.address || 'N/A'}</p>
                    </div>

                    {/* Public Key */}
                    {account?.publicKey && (
                        <div className='mb-4'>
                            <span className='text-gray-600'>Public Key:</span>
                            <p className='break-all bg-gray-200 p-2 rounded'>{account.publicKey}</p>
                        </div>
                    )}

                    {/* Copy Address Button */}
                    <Button onClick={copyAddress} className='w-full mt-4'>
                        <Copy className='h-4 w-4 mr-2' /> Copy Address
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default WalletConnected;
