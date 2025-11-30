/* eslint-disable @typescript-eslint/no-explicit-any */


import { useUpdateSkills } from "@/components/hook/recommadationHook/useUpdateSkills";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

interface SkillsDialogProps {
  initialSkills?: string[];
  onSave?: (skills: string[]) => void;
}

export function SkillsDialog({ initialSkills = [], onSave }: SkillsDialogProps) {
  const { user } = useSelector((state: any) => state.auth);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const updateSkillsMutation = useUpdateSkills({ userId: user._id, token: user.token });

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSave = () => {
    updateSkillsMutation.mutate(
      { skills },
      {
        onSuccess: () => {
          onSave?.(skills);
          setOpen(false);
           queryClient.invalidateQueries({ queryKey: ["getProfileDevs"] });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Skills</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Your Skills</DialogTitle>
          <DialogDescription>
            Add or remove skills from your profile.
          </DialogDescription>
        </DialogHeader>

        {/* UI */}
        <div className="flex flex-col gap-4">
          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleAddSkill} size="icon" disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Skills list */}
          <div className="min-h-[120px] rounded-lg border p-3">
            {skills.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No skills added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1 pr-1">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 p-0.5 hover:bg-muted-foreground/20 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Count */}
          <p className="text-xs text-muted-foreground">{skills.length} skills</p>

          <Button onClick={handleSave} className="w-full" disabled={updateSkillsMutation.isPending}>
            {updateSkillsMutation.isPending ? "Saving..." : "Save Skills"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
