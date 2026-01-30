"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { format, isPast, parseISO } from "date-fns";
import {
  Vote,
  CheckCircle2,
  Clock,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupItem as BaseRadioGroupItem,
} from "@/components/ui/radio-group";

const RadioGroup = BaseRadioGroup as any;
const RadioGroupItem = BaseRadioGroupItem as any;


import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function PollsPage() {
  const [selectedPoll, setSelectedPoll] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch polls
  const { data: polls = [], isLoading } = useQuery({
    queryKey: ["polls"],
    queryFn: () =>
  (base44.entities as any).Poll.list("-created_date", 100),

  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({
      pollId,
      optionIndex,
    }: {
      pollId: string;
      optionIndex: number;
    }) => {
      const poll = polls.find((p: any) => p.id === pollId);
      if (!poll) throw new Error("Poll not found");

      const updatedOptions = poll.options.map((opt: any, idx: number) => ({
        ...opt,
        votes: idx === optionIndex ? (opt.votes || 0) + 1 : opt.votes || 0,
      }));

      return (base44.entities as any).Poll.update(pollId, {
        options: updatedOptions,
        voters: [...(poll.voters || [])],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polls"] });
      setSelectedPoll(null);
      setSelectedOption(null);
    },
  });

  const handleVote = () => {
    if (selectedPoll && selectedOption !== null) {
      voteMutation.mutate({
        pollId: selectedPoll.id,
        optionIndex: selectedOption,
      });
    }
  };

  // Temporary logic (until auth is wired properly)
  const hasVoted = (_poll: any) => false;

  const isExpired = (poll: any) =>
    poll.expires_at && isPast(parseISO(poll.expires_at));

  const activePolls = polls.filter(
    (p: any) => !isExpired(p) && p.status === "active"
  );
  const closedPolls = polls.filter(
    (p: any) => isExpired(p) || p.status === "closed"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Community Polls</h1>
        <p className="text-slate-500 mt-1">
          Vote on community decisions and surveys
        </p>
      </div>

      {/* Active Polls */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <Vote className="w-4 h-4" />
          Active Polls
        </h2>

        {isLoading ? (
          <p>Loading polls…</p>
        ) : activePolls.length === 0 ? (
          <p className="text-slate-500">No active polls</p>
        ) : (
          <div className="grid gap-4">
            {activePolls.map((poll: any) => (
              <div
                key={poll.id}
                className="bg-white rounded-2xl p-6 border"
              >
                <h3 className="font-semibold">{poll.question}</h3>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedPoll(poll);
                    setSelectedOption(null);
                  }}
                >
                  Vote Now
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vote Dialog */}
      <Dialog open={!!selectedPoll} onOpenChange={() => setSelectedPoll(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPoll?.question}</DialogTitle>
            {selectedPoll?.description && (
              <DialogDescription>
                {selectedPoll.description}
              </DialogDescription>
            )}
          </DialogHeader>

          <RadioGroup
            value={selectedOption?.toString()}
            onValueChange={(v) => setSelectedOption(parseInt(v))}
          >
            {selectedPoll?.options?.map((option: any, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-3 p-3 border rounded cursor-pointer",
                  selectedOption === index && "border-emerald-500"
                )}
                onClick={() => setSelectedOption(index)}
              >
                <RadioGroupItem value={index.toString()} />
                <Label>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedPoll(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleVote}
              disabled={selectedOption === null}
            >
              Submit Vote
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
