import { AlertCircle, CheckCircle, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export type ValidationType = "success" | "warning" | "error";

interface ValidationAlertProps {
  type: ValidationType;
  message: string;
  onDismiss?: () => void;
}

export default function ValidationAlert({
  type,
  message,
  onDismiss,
}: ValidationAlertProps) {
  const config = {
    success: {
      icon: CheckCircle,
      className: "border-l-4 border-l-chart-3",
      iconColor: "text-chart-3",
    },
    warning: {
      icon: AlertTriangle,
      className: "border-l-4 border-l-chart-4",
      iconColor: "text-chart-4",
    },
    error: {
      icon: AlertCircle,
      className: "border-l-4 border-l-destructive",
      iconColor: "text-destructive",
    },
  };

  const { icon: Icon, className, iconColor } = config[type];

  return (
    <Alert className={className} data-testid={`alert-${type}`}>
      <Icon className={`h-4 w-4 ${iconColor}`} />
      <AlertDescription className="flex items-center justify-between gap-2">
        <span className="flex-1">{message}</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mr-2"
            onClick={onDismiss}
            data-testid="button-dismiss-alert"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
