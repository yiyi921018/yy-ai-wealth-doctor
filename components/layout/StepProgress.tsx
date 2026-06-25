import { Progress } from "@/components/ui/progress";

const steps = ["歡迎", "基本資訊", "資產選擇", "資產價值", "分析結果"];

export function StepProgress({ currentStep }: { currentStep: number }) {
  const value = (currentStep / steps.length) * 100;

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl rounded-3xl border bg-white/70 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>步驟 {currentStep}/{steps.length}</span>
        <span>{steps[currentStep - 1]}</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
