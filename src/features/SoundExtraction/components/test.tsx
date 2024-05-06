import { RefObject, useEffect, useRef, useState } from 'react';

interface TestClassOptions {
  container: HTMLDivElement;
  bgColor?: string;
  width?: number;
  height?: number;
}

class TestClass {
  private container: HTMLDivElement;
  private child: HTMLDivElement | null = null;
  private bgColor: string;
  private width: number;
  private height: number;

  constructor(options: TestClassOptions) {
    this.container = options.container;
    this.bgColor = options.bgColor || 'red';
    this.width = options.width || 100;
    this.height = options.height || 100;

    this.createChildDiv();
  }

  destroy() {
    if (this.child) {
      this.child.remove();
    }
  }

  private createChildDiv() {
    const child = document.createElement('div');
    child.style.width = `${this.width}px`;
    child.style.height = `${this.height}px`;
    child.style.backgroundColor = this.bgColor;

    this.container.appendChild(child);
    this.child = child;
  }
}

type OmitContainer = Omit<TestClassOptions, 'container'>;
interface UseTestOptions extends OmitContainer {
  container: RefObject<HTMLDivElement> | null;
}

export function useTest({ container, ...options }: UseTestOptions) {
  const isInitilizing$ = useRef<boolean>(false);

  const [testInstance, setTestInstance] = useState<TestClass | null>(null);

  useEffect(() => {
    if (!container?.current) return;

    const prevContainer = container;

    if (isInitilizing$.current) return;
    isInitilizing$.current = true;

    const instance = new TestClass({ ...options, container: container.current });
    setTestInstance(instance);

    return () => {
      if (prevContainer === container) return;
      instance.destroy();
    };
  }, [options]);

  return { testInstance };
}
