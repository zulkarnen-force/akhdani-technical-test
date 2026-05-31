import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

type CardHeaderComponent = React.FC<{
  children: ReactNode;
}> & {
  Title: typeof CardTitle;
  Description: typeof CardDescription;
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`p-6 bg-surface-base rounded-xl shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between mb-6">{children}</div>;
}

function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground mt-1">{children}</p>;
}

function CardContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function CardButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-start justify-between px-4 py-2 rounded-lg bg-primary text-font-primary bg-brand-100 hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}

const Header = CardHeader as CardHeaderComponent;

Card.Header = Header;
Header.Title = CardTitle;
Header.Description = CardDescription;

Card.Title = CardTitle;
Card.Content = CardContent;
Card.Button = CardButton;
