import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button Variants usando CVA (Class Variance Authority)
 * 
 * Cores do Design:
 * - Primary: #2585F4 com drop shadow e inner shadow
 * - Outline: #1978E5 apenas borda, sem fill
 * - Inner shadow: #FFFFFF 20% opacity
 */

export const buttonVariants = cva(
  // Base styles - sempre aplicados
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'rounded-lg',
  ],
  {
    variants: {
      variant: {
        // Primary: #2585F4 com drop shadow e inner shadow
        primary: [
          'bg-[#2585F4] text-white',
          'hover:bg-[#1978E5]',
          'active:bg-[#1565C0]',
          // Drop shadow: X:0 Y:4 Blur:15 Color:#135BEC 40%
          'shadow-[0_4px_15px_rgba(19,91,236,0.4)]',
          // Inner shadow: X:0 Y:1 Blur:1 Color:#FFFFFF 20%
          '[box-shadow:0_4px_15px_rgba(19,91,236,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]',
          'hover:shadow-[0_6px_20px_rgba(19,91,236,0.5)]',
          'focus-visible:ring-[#2585F4]',
        ],
        
        // Secondary: Cinza neutro
        secondary: [
          'bg-gray-600 text-white',
          'hover:bg-gray-700',
          'active:bg-gray-800',
          'shadow-sm',
          'focus-visible:ring-gray-500',
        ],
        
        // Outline: #1978E5 apenas borda, sem fill
        outline: [
          'border-2 border-[#1978E5]',
          'bg-transparent',
          'text-[#1978E5]',
          'hover:bg-[#1978E5]/5',
          'active:bg-[#1978E5]/10',
          'focus-visible:ring-[#1978E5]',
        ],
        
        // Ghost: Sem borda, apenas hover
        ghost: [
          'bg-transparent',
          'text-gray-700',
          'hover:bg-gray-100',
          'active:bg-gray-200',
          'focus-visible:ring-gray-400',
        ],
        
        // Danger: Vermelho para ações destrutivas
        danger: [
          'bg-red-600 text-white',
          'hover:bg-red-700',
          'active:bg-red-800',
          'shadow-sm',
          'focus-visible:ring-red-500',
        ],
      },
      
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
      
      fullWidth: {
        true: 'w-full',
      },
    },
    
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Export type for variant props
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
