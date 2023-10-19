from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SummarizedDocument
from .serializers import SummarizedDocumentSerializer
from .utils import (count_pdf_pages, generate_application, generate_questions,
                    generate_system_design, get_image, get_summary)


class PDFSummaryAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        pdf_file = request.data["pdf_file"]
        pages = count_pdf_pages(pdf_file)
        summary = get_summary(pdf_file, pages)
        system_design_text = generate_system_design(summary)

        questions = generate_questions(summary)

        image = get_image(summary)
        app = generate_application(summary)
        summarized_doc = SummarizedDocument(
            original_document=pdf_file,
            summarized_text=summary,
            questions=questions,
            image_url=image,
            application_design=app,
            system_design=system_design_text
        )
        summarized_doc.save()

        serializer = SummarizedDocumentSerializer(summarized_doc)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, pk=None):
        if pk is not None:
            try:
                obj = SummarizedDocument.objects.get(pk=pk)
                serializer = SummarizedDocumentSerializer(obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SummarizedDocument.DoesNotExist:
                return Response(
                    {"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND
                )
        else:
            queryset = SummarizedDocument.objects.all().order_by("-id")
            serializer = SummarizedDocumentSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
