import  {ShieldOutlined, LockOutlined}  from '@mui/icons-material';
import { SecurityBadge, Testimonial } from './privacy-section.types';

export const securityBadges: SecurityBadge[] = [
  {
    id: 'lgpd',
    text: 'LGPD COMPLIANT',
    variant: 'green',
    icon: <ShieldOutlined sx={{ fontSize: 16 }} />,
  },
  {
    id: 'encryption',
    text: 'AES-256 ENCRYPTED',
    variant: 'blue',
    icon: <LockOutlined sx={{ fontSize: 16 }} />,
  },
];

export const featuredTestimonial: Testimonial = {
  id: 'joao-p',
  quote:
    'O VozJusta traduziu o juridiquês e me deu segurança. O simulador foi o divisor de águas: entrei na audiência sabendo exatamente o que responder.',
  authorName: 'João P.',
  authorRole: 'MICROEMPREENDEDOR (MEI)',
  authorInitials: 'JP',
};


export const privacyContent = {
  title: 'Privacidade Inviolável.',
  description:
    'Seus dados não são apenas "seguros", eles são blindados. Nossa arquitetura Zero-Knowledge garante que apenas você e seu advogado tenham acesso aos detalhes sensíveis do caso.',
} as const;
