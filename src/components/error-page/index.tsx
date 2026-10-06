import { Card } from '@heroui/react';
import { CustomError } from '../../constants/errors';

const ErrorPage: React.FC<CustomError> = ({ status, title, subTitle }) => (
  <div className="flex min-h-screen items-center justify-center bg-background p-6">
    <Card className="w-full max-w-xl p-10 text-center">
      <p className="font-mono text-5xl font-semibold text-accent">{status}</p>
      <Card.Header className="mt-6 items-center">
        <Card.Title className="text-xl">{title}</Card.Title>
        <Card.Description>{subTitle}</Card.Description>
      </Card.Header>
    </Card>
  </div>
);

export default ErrorPage;
