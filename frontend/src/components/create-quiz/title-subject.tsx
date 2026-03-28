import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupInput,
} from "@/components/ui/input-group"

interface TitleSubjectProps {
    title: string;
    subject: string;
    setTitle: (title: string) => void;
    setSubject: (subject: string) => void;
}

export function TitleSubject({ title, subject, setTitle, setSubject }: TitleSubjectProps) {
    return (
        <FieldGroup className="flex-row gap-4">
            <Field className="flex-1">
                <FieldLabel>Title</FieldLabel>
                <InputGroup className="bg-white/50">
                    <InputGroupInput
                        placeholder="Enter quiz title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </InputGroup>
            </Field>

            <Field className="flex-1">
                <FieldLabel>Pick a subject</FieldLabel>
                <Select onValueChange={(value) => setSubject(value)} value={subject}>
                    <SelectTrigger className="bg-white/50">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Subjects</SelectLabel>
                            <SelectItem value="math">Math</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="geography">Geography</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
}