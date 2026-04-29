import type { ComponentProps, FC } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircleUserRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

import {
  Field,
} from "@/components/ui/field";

type HeaderButtonProps = Omit<ComponentProps<typeof Button>, "className" | "size">;

const HeaderButton: FC<HeaderButtonProps> = ({ children, ...props }) => (
  <Button
    size="lg"
    className="
      jersey-25-regular
      bg-palette-4
      hover:bg-pink-200
      text-xl
      text-black 
      font-bold
      hover:cursor-pointer
      border-palette-2
      rounded-full
      p-6
      w-[10em]"
    {...props}
  >
    {children}
  </Button>
);

const Header: FC = () => {
  const [subject, setSubject] = useState<string>("");
  const navigate = useNavigate();

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    navigate(`/quizes/${value}`);
  };

  return (
    <header id="header" className="flex items-center justify-between px-4 py-0 w-full h-auto bg-palette-3">
      <h1
        className="jersey-25-regular leading-none"
        style={{ fontSize: '6rem', color: 'var(--palette-1)', WebkitTextStrokeWidth: '0.15rem', WebkitTextStrokeColor: 'black' }}>
        FlashWhizz
      </h1>

      <div id="navigation" className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link to="/create-quiz">
            <HeaderButton>Create Quiz</HeaderButton>
          </Link>

          <Field className="flex-1">
            <Select onValueChange={handleSubjectChange} value={subject}>
              <SelectTrigger
                className="
                  jersey-25-regular
                  bg-palette-4
                  hover:bg-pink-200
                  text-xl
                  text-black
                  font-bold
                  hover:cursor-pointer
                  border-palette-2
                  rounded-full
                  p-6
                  w-[10em]
                  h-auto
                  justify-center
                  data-[placeholder]:text-black
                "
              >
                <SelectValue placeholder="Search Quiz" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>


                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Link to="/study-method">
            <HeaderButton>Study Methods</HeaderButton>
          </Link>
        </div>

        <Link to="/profile">
          <CircleUserRoundIcon
            size={80}
            color="var(--palette-4)"
            strokeWidth={1.5}
            className="cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;