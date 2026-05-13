import { API } from '@/lib/api';
import { authStorage } from '@/lib/auth';

export async function downloadReportAsPdf(reportId: string) {
  const token = authStorage.getAccessToken();

  try {
    const response = await fetch(`${API.BASE_URL}/report/pdf/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/pdf',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        fields:
          response.status === 404
            ? ['Relatório não encontrado']
            : ['Erro ao baixar PDF'],
      };
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const filename = `relatorio_vozjusta_${reportId}.pdf`;

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);

    return {
      success: true,
      data: filename,
    };
  } catch {
    return {
      success: false,
      fields: ['Erro de conexão com o servidor'],
    };
  }
}
