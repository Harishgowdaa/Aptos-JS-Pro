import React from 'react';
import { useAccountActivities } from '@aptos-labs/react';
import { truncateAddress, useWallet } from '@aptos-labs/wallet-adapter-react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { formatApt } from '@aptos-labs/js-pro';
import Header from '@/components/header';

export const TransactionsTable = () => {
    const { account } = useWallet();
    const { data: activities, isLoading } = useAccountActivities({ address: account?.address });
    console.log('activities:', activities);

    return (
        <>
            <Header />

            <div className='p-4'>
                <h2 className='text-xl font-bold mb-4'>User Transactions</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full border-collapse border border-gray-300'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border p-2'>Version</th>
                                <th className='border p-2'>Type</th>
                                <th className='border p-2'>Timestamp</th>
                                <th className='border p-2'>Sender</th>
                                <th className='border p-2'>Sent To</th>
                                <th className='border p-2'>Amount (APT)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className='text-center p-4'>
                                       Loading..
                                    </td>
                                </tr>
                            ) : (
                                activities?.pages?.[0]?.events?.map((tx, index) => (
                                    <tr key={index} className='border'>
                                        <td className='border p-2'>{tx.version.toString()}</td>
                                        <td className='border p-2'>{tx._type}</td>
                                        <td className='border p-2'>{new Date(tx.timestamp).toLocaleString()}</td>
                                        <td className='border p-2'>
                                            {tx.sender ? truncateAddress(tx.sender?.address) : 'N/A'}{' '}
                                            {tx.sender ? (
                                                <Copy
                                                    size={12}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(tx.sender?.address);
                                                        toast.success('Copied to clipboard!');
                                                    }}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td className='border p-2'>
                                            {tx.receiver ? truncateAddress(tx.receiver?.address) : 'N/A'}{' '}
                                            {tx.receiver ? (
                                                <Copy
                                                    size={12}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(tx.receiver?.address);
                                                        toast.success('Copied to clipboard!');
                                                    }}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td className='border p-2'>{tx.amount ? formatApt(tx.amount) : '0'} APT</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
