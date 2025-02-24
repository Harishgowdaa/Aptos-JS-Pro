import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { Copy, LogOut, User, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { APTOS_CONNECT_ACCOUNT_URL, isAptosConnectWallet, truncateAddress, useWallet } from '@aptos-labs/wallet-adapter-react';

const Header = () => {
    const navigate = useNavigate();
    const { account, connected, disconnect, wallet } = useWallet();

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
        <header className='flex items-center justify-between px-6 py-4 bg-gray-500 text-white shadow-md'>
            {/* Left Section: Transactions & Send Transaction */}
            <div className='flex gap-6'>
                <Button variant='ghost' className='cursor-pointer' onClick={() => navigate('/transactions')}>
                    Transactions
                </Button>
                <Button variant='ghost' className='cursor-pointer' onClick={() => navigate('/send-transaction')}>
                    Send Transaction
                </Button>
            </div>

            {/* Right Section: Wallet Dropdown */}
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='flex items-center gap-2'>
                            {wallet?.icon ? <img src={wallet.icon} alt='Wallet Icon' className='h-5 w-5' /> : <Wallet className='h-5 w-5' />}
                            {account?.ansName || truncateAddress(account?.address) || 'Unknown'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onSelect={copyAddress} className='gap-2 cursor-pointer'>
                            <Copy className='h-4 w-4' /> Copy address
                        </DropdownMenuItem>
                        {wallet && isAptosConnectWallet(wallet) && (
                            <DropdownMenuItem className='gap-2'>
                                <a href={APTOS_CONNECT_ACCOUNT_URL} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 w-full'>
                                    <User className='h-4 w-4' /> Account
                                </a>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onSelect={disconnect} className='gap-2 cursor-pointer'>
                            <LogOut className='h-4 w-4' /> Disconnect
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
