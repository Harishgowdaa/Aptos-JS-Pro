import React from 'react'
import { truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  useAptBalance,
  useNetwork,
  useSignAndSubmitTransaction,
  useWaitForTransaction,
  useAccountActivities,
} from "@aptos-labs/react";
import { formatApt, parseApt } from "@aptos-labs/js-pro";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const SignAndSubmitTransaction = () => {
    const { account } = useWallet();

  const network = useNetwork();

  const { data: balance } = useAptBalance();
  // const { data: activities } = useAccountActivities({ address: account?.address });

  // console.log('activities:', activities);
  
  const { hash, signAndSubmitTransaction, error } = useSignAndSubmitTransaction(
    {
      onError: (error) => {
        toast.error(error as unknown as string);
      },
      onSuccess: () => {
        toast.success("Transaction sent!");
      },
    }
  );

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransaction({ hash });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    signAndSubmitTransaction({
      data: {
        function: `0x1::aptos_account::transfer`,
        functionArguments: [to, parseApt(value)],
        typeArguments: [],
      },
    });
  }
  return (
    <>
        {account && (
            <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-2xl border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(account.address);
                      toast.success("Copied to clipboard!");
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {truncateAddress(account.address)} <Copy size={12} />
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t pt-6 grid gap-4">
                <div className="flex justify-between gap-2">
                  <span className="text-secondary-foreground">Balance</span>{" "}
                  <span className="font-bold">
                    {balance ? formatApt(balance) : "0"} APT
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-secondary-foreground">Network</span>{" "}
                  <span className="font-bold capitalize">{network.name}</span>
                </div>
                <div>
                  <p>Send Coins</p>
                  <form className="grid gap-4 pt-2" onSubmit={(e) => submit(e)}>
                    <div className="grid">
                      <label htmlFor="address" className="text-xs">
                        Address
                      </label>
                      <input
                        name="address"
                        placeholder="0x1…e918"
                        required
                        className="border rounded-md p-2"
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="value" className="text-xs">
                        Amount
                      </label>
                      <input
                        name="value"
                        placeholder="0.1"
                        className="border rounded-md p-2"
                        required
                      />
                    </div>
                    <Button type="submit">Send</Button>
                  </form>
                </div>
                {hash && (
                  <>
                    <div className="flex justify-between gap-2">
                      <span className="text-secondary-foreground">Hash</span>{" "}
                      <span
                          className="font-mono font-bold cursor-pointer hover:underline"
                          onClick={() => {
                            navigator.clipboard.writeText(hash);
                            toast.success("Transaction hash copied!");
                          }}
                        >
                          {hash.slice(0, 10)}...{hash.slice(-10)} 🔗
                        </span>
                    </div>
                    {isConfirming && <p>Confirming...</p>}
                    {isConfirmed && <p>Confirmed!</p>}
                  </>
                )}
                {error && (
                  <p className="text-red-500">{error as unknown as string}</p>
                )}
              </CardContent>
            </Card>
          )}
      </>
  )
}
