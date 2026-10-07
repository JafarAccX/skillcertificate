import React from 'react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        404
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't find what you were looking for.
      </p>
      <Button to="/" className="mt-8">
        Go home
      </Button>
    </div>
  );
};
