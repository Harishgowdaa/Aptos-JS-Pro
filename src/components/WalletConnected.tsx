import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { APTOS_CONNECT_ACCOUNT_URL, isAptosConnectWallet, truncateAddress, useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'sonner';
import { Copy, LogOut, User } from 'lucide-react';

const WalletConnected = () => {
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
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <div className='flex gap-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>{account?.ansName || truncateAddress(account?.address) || 'Unknown'}</Button>
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
        </div>
    );
};

export default WalletConnected;
