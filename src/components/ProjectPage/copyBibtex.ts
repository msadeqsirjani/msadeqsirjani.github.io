import toast from 'react-hot-toast';

export const copyBibtex = async (bibtex: string) => {
  try {
    await navigator.clipboard.writeText(bibtex);
    toast.success('BibTeX copied to clipboard');
    return true;
  } catch {
    toast.error('Unable to copy BibTeX automatically');
    return false;
  }
};
