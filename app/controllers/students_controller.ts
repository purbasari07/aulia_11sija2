import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { schema, rules } from '@adonisjs/validator'

export default class StudentsController {
  public async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok({
      message: 'Daftar siswa berhasil diambil',
      data: students,
    })
  }

  public async store({ request, response }: HttpContext) {
    const studentSchema = schema.create({
      name: schema.string({}, [rules.required()]),
      className: schema.string({}, [rules.required()]),
    })

    const payload = await request.validate({ schema: studentSchema })

    const student = await Student.create(payload)

    return response.created({
      message: 'Siswa berhasil ditambahkan',
      data: student,
    })
  }

  public async show({ params, response }: HttpContext) {
    const student = await Student.find(params.id)

    if (!student) {
      return response.notFound({
        message: 'Siswa tidak ditemukan',
      })
    }

    return response.ok({
      message: 'Berhasil mengambil data siswa',
      data: student,
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const student = await Student.find(params.id)

    if (!student) {
      return response.notFound({
        message: 'Siswa tidak ditemukan',
      })
    }

    const studentSchema = schema.create({
      name: schema.string.optional({}, [rules.required()]),
      className: schema.string.optional({}, [rules.required()]),
    })

    const payload = await request.validate({ schema: studentSchema })

    student.merge(payload)
    await student.save()

    return response.ok({
      message: 'Siswa berhasil diperbarui',
      data: student,
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const student = await Student.find(params.id)

    if (!student) {
      return response.notFound({
        message: 'Siswa tidak ditemukan',
      })
    }

    await student.delete()

    return response.ok({
      message: 'Siswa berhasil dihapus',
    })
  }
}
