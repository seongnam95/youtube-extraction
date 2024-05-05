import { useEffect, useMemo, useRef, useState } from 'react';

type OmitContainer = Omit<TestClassOptions, 'container'>;
interface useTestOptions extends OmitContainer {}

export const useTest = (options?: useTestOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [audioWave, setAudioWave] = useState<TestClass>();
  const combinedOptions = useMemo(() => Object.entries({ ...options }).flat(), [options]);

  useEffect(() => {
    if (!containerRef?.current) return;

    const instance = TestClass.create({ ...options, container: containerRef.current });

    return () => instance.destroy();
  }, [containerRef, ...combinedOptions]);

  const TestComponent = () => <div ref={containerRef} id="container" />;

  return { TestComponent };
};

interface TestClassOptions {
  container: HTMLDivElement;
  bgColor?: string;
  width?: number;
  height?: number;
}

class TestClass {
  private container: HTMLDivElement;
  private child: HTMLDivElement;
  private bgColor: string;
  private width: number;
  private height: number;

  constructor(options: TestClassOptions) {
    this.container = options.container;
    this.bgColor = options.bgColor || 'red';
    this.width = options.width || 100;
    this.height = options.height || 100;

    const child = this.createChildDiv();
    this.child = child;
  }

  destroy() {
    this.child.remove();
  }

  public static create(options: TestClassOptions) {
    return new TestClass(options);
  }

  private createChildDiv(): HTMLDivElement {
    const child = document.createElement('div');
    child.style.width = `${this.width}px`;
    child.style.height = `${this.height}px`;
    child.style.backgroundColor = this.bgColor;

    this.container.appendChild(child);
    return child;
  }
}
