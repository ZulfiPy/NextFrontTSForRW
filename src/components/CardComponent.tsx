import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";

interface CardComponentProps {
    cardTitle: string,
    cardDescription: string,
}

const CardComponent = ({ cardTitle, cardDescription }: CardComponentProps) => {
    return (
        <Card className="w-80">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
                <Link href={`${cardTitle}`} className="hover:undeline">Access the {cardTitle} component</Link>
            </CardHeader>
        </Card>
    )
}

export default CardComponent;