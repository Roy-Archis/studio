import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SimplifiedExplanation from "./SimplifiedExplanation";

interface DataCardProps {
    title: string;
    value: string;
    explanationTerm?: string;
}

export default function DataCard({ title, value, explanationTerm }: DataCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium text-muted-foreground">{title}</CardTitle>
                    {explanationTerm && <SimplifiedExplanation term={explanationTerm} />}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    )
}
